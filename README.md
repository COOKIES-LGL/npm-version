### npm 包定位插件，

支持：

- 快速在 node_module 中打开选中的 npm 包.
- 在新窗口打开选中的 npm 包进行源码阅读.
- 在 npm.com 中打开选中的 npm 包快速了解包信息，`npm registry` 可以自行配置成公司内部源.

[参考地址](https://code.visualstudio.com/api/get-started/your-first-extension)

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

- `open-npm.registry`: set the registry for jump navigate.

### demo

![demo](https://github.com/COOKIES-LGL/npm-version/blob/master/assets/open-npm.gif)

## Release Notes

项目初始化

### 1.0.0

---

### 快捷使用

```json
{
  "keybindings": [
    {
      "command": "open-npm.open",
      "key": "ctrl+shift+l",
      "mac": "cmd+shift+l",
      "when": "editorTextFocus"
    },
    {
      "command": "open-npm.openInNodeModules",
      "key": "ctrl+m",
      "mac": "cmd+m",
      "when": "editorTextFocus"
    },
    {
      "command": "open-npm.openInNewWindow",
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
  or `Ctrl+Shift+l` on Windows, Linux).

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
