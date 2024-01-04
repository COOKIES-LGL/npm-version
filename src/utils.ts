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
