import vscode from 'vscode';
import open from './commands';

export const activate = (context: vscode.ExtensionContext) => {
  // const extensions = vscode.extensions.getExtension('npm-version'); 可以获取当前扩展程序
  const disposable = vscode.commands.registerCommand('npm-version.open', () => open());
  context.subscriptions.push(disposable);
};

export function deactivate() {}
