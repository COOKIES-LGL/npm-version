import { compact, attempt, isError, castArray } from 'lodash-es';
import openPath from 'open';
import * as path from 'path';
import * as vscode from 'vscode';
import { readFile, folderGetRootPath, folderGetWrapperPathOf } from './utils';

async function open(pkg?: string | string[]) {
  /* SELECTIONS */
  if (!pkg) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const { document, selections } = editor,
        texts = compact(selections.map(selection => document.getText(selection)));
      if (texts.length) {
        pkg = texts;
      }
    }
  }

  /* PROJECT NAME */
  let projectName;

  if (!pkg) {
    const editor = vscode.window.activeTextEditor,
      editorPath = editor && editor.document.uri.fsPath,
      rootPath = folderGetRootPath(editorPath);

    if (rootPath) {
      const projectPath = await folderGetWrapperPathOf(
        rootPath,
        editorPath || rootPath,
        'package.json'
      );

      if (projectPath) {
        const packagePath = path.join(projectPath, 'package.json'),
          packageContent = await readFile(packagePath),
          packageObj = attempt(JSON.parse, packageContent),
          isNPMPackage = isError(packageObj) && packageObj.name;

        if (isNPMPackage) {
          projectName = packageObj.name;
        }
      }
    }
  }

  /* INPUT BOX */
  if (!pkg) {
    pkg = await vscode.window.showInputBox({
      placeHolder: 'NPM package name...',
      value: projectName
    });
  }

  /* OPEN */
  if (pkg) {
    castArray(pkg).map(pkg => openPath(`https://www.npmjs.com/package/${pkg}`));
  }
}

export default open;
