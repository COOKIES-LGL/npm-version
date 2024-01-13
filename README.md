# npm-version README

## 项目初始化

[参考地址](https://code.visualstudio.com/api/get-started/your-first-extension)

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

- `npm-version.registry`: set the registry for jump navigate.

## Release Notes

项目初始化

### 1.0.0

---

### 快捷使用

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

## Working with Markdown

- Open In New Window (`Cmd+Alt+m` on macOS or `Ctrl+Alt+m` on Windows and Linux).
- Open In Node Modules (`Cmd+m` on macOS or `Ctrl+m` on Windows and Linux).
- Open In npm.com (`Cmd+Shift+l` on macOS
  or `ctrl+shift+l` on Windows, Linux).

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
