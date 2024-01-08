# npm-version README

## 项目初始化

[参考地址](https://code.visualstudio.com/api/get-started/your-first-extension)

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `myExtension.enable`: Enable/disable this extension.
- `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

---

## Following extension guidelines

###

```json
{
  "keybindings": [
    {
      "command": "npm-version.open",
      "key": "ctrl+shift+l",
      "mac": "cmd+shift+l",
      "when": "editorTextFocus"
    },
    {
      "command": "npm-version.openInNodeModules",
      "key": "ctrl+m",
      "mac": "cmd+m",
      "when": "editorTextFocus"
    },
    {
      "command": "npm-version.openInNewWindow",
      "key": "ctrl+alt+m",
      "mac": "cmd+alt+m",
      "when": "editorTextFocus"
    }
  ]
}
```

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
