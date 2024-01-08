import { sortBy } from 'lodash-es';
import absolute from 'absolute';
import { findUp } from 'find-up';
import fs from 'fs';
import path from 'path';
import pify from 'pify';
import vscode from 'vscode';

export const resolvePath = function (pathParam: string) {
  return path.resolve(__dirname, pathParam);
};

export const readFile = async (filePath: string) => {
  try {
    return (await pify(fs.readFile)(filePath, { encoding: 'utf8' })).toString();
  } catch (e) {
    return;
  }
};

export const folderGetRootPath = (basePath?: string) => {
  const { workspaceFolders } = vscode.workspace;
  if (!workspaceFolders) {
    return;
  }
  const firstRootPath = workspaceFolders[0].uri.fsPath;
  if (!basePath || !absolute(basePath)) {
    return firstRootPath;
  }
  const rootPaths = workspaceFolders.map(folder => folder.uri.fsPath),
    sortedRootPaths = sortBy(rootPaths, [path => path.length]).reverse();
  // In order to get the closest root
  return sortedRootPaths.find(rootPath => basePath.startsWith(rootPath));
};

export const folderGetWrapperPathOf = async (
  rootPath: string,
  cwdPath: string,
  findPath: string
) => {
  const foundPath = await findUp(findPath, { cwd: cwdPath });
  if (foundPath) {
    const wrapperPath = path.dirname(foundPath);
    if (wrapperPath.startsWith(rootPath)) {
      return wrapperPath;
    }
  }
};

export const openFolderNewWindow = (folderPath: string, inNewWindow: boolean = true) => {
  folderPath = path.normalize(folderPath);
  const folderUri = vscode.Uri.file(folderPath);
  vscode.commands.executeCommand('vscode.openFolder', folderUri, inNewWindow);
};

/**
 * 在编辑器中打开文本文件
 * @param filePath 文件目录
 */
export const openFile = (filePath: string) => {
  const openPath = vscode.Uri.file(filePath);
  // 白名单文件，默认认为这些文件存在
  const whiteFileList = [
    'package.json',
    'index.js',
    'index.ts',
    'index.mjs',
    'index.cjs',
    'main.js',
    'main.ts',
    'main.mjs',
    'main.cjs'
  ];
  for (let i = 0; i < whiteFileList.length; i++) {
    const fileName = whiteFileList[i];
    // 组装文件路径
    const filePath = path.resolve(openPath.path, fileName);
    // 如果文件存在
    if (fs.existsSync(filePath)) {
      (process as any).__fe_jump_current_path__ = filePath;
      vscode.workspace.openTextDocument(filePath).then(doc => {
        vscode.window.showTextDocument(doc);
        // 定位左侧文件树
        vscode.commands.executeCommand('revealInExplorer', filePath);
      });
      return;
    }
  }
};
