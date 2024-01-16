import vscode from 'vscode';
import openChrome from './commands/open-in-chrome';
import openPackageIn from './commands/open-in-nodeModules';
import { openFolderNewWindow, openFile } from './utils';

interface Process {
  // 临时变量，为了连接 Definition 触发后，和 onDidChangeActiveTextEditor 匹配时触发更新左侧文件树
  __fe_jump_current_path__: string;
}

declare const process: Process & NodeJS.Process;
process.__fe_jump_current_path__ = '';
export const activate = (context: vscode.ExtensionContext) => {
  // const extensions = vscode.extensions.getExtension('open-npm'); 可以获取当前扩展程序
  const disposable = vscode.commands.registerCommand('open-npm.open', () => openChrome());
  context.subscriptions.push(disposable);
  const disposableNodeModules = vscode.commands.registerCommand(
    'open-npm.openInNodeModules',
    () => {
      openPackageIn(openFile);
    }
  );
  context.subscriptions.push(disposableNodeModules);
  const disposableNewWindowOpenPkg = vscode.commands.registerCommand(
    'open-npm.openInNewWindow',
    () => {
      openPackageIn(openFolderNewWindow);
    }
  );
  context.subscriptions.push(disposableNewWindowOpenPkg);
  // 在激活编辑器时刷新树视图
  vscode.window.onDidChangeActiveTextEditor(editor => {
    const uri = editor?.document?.uri;
    if (uri) {
      if (process.__fe_jump_current_path__ === uri.path) {
        vscode.commands.executeCommand('revealInExplorer', uri);
      }
    }
  });
};

export function deactivate() {}
