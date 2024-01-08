import { compact, isEqual, castArray, findLastIndex } from 'lodash-es';
import * as path from 'path';
import * as resolveFrom from 'resolve-from';
import * as vscode from 'vscode';
import { folderGetRootPath } from '../utils';

async function openPackageIn(openMethod: (filePath: string) => void) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return vscode.window.showErrorMessage('You need to have at least a file open');
  }
  let pkg: string | string[] = '';
  /* SELECTIONS */
  if (!pkg) {
    if (editor) {
      const { document, selections } = editor,
        texts = compact(selections.map(selection => document.getText(selection)));
      if (texts.length) {
        pkg = texts;
      }
    }
  }

  /* OPEN IN NODE_MODULES */
  if (pkg) {
    const editorPath = editor.document.uri.fsPath,
      rootPath = folderGetRootPath(editorPath);
    try {
      if (rootPath) {
        castArray(pkg).map(pkg => {
          const filePath: string = resolveFrom.default(rootPath, pkg),
            fileParts = filePath.split(/(?:\\|\/)+/g),
            pkgParts = pkg.split(/(?:\\|\/)+/g),
            endIndex = findLastIndex(fileParts, (p, index) =>
              isEqual(fileParts.slice(index - pkgParts.length, index), pkgParts)
            ),
            folderPath = fileParts.slice(0, endIndex).join(path.sep);
          openMethod(folderPath);
        });
      }
    } catch (e) {
      vscode.window.showErrorMessage(`Module "${pkg}" not found in node_modules`);
    }
  }
}

export default openPackageIn;
