# CodeSpectrum

## Overview

**CodeSpectrum** is a versatile Visual Studio Code extension that enhances your coding experience by providing powerful features for keyword highlighting, automatic commenting, and keyword removal. Improve code readability, streamline your workflow, and make your codebase more manageable with CodeSpectrum.

## Features

- **Keyword Highlighter**: Highlight specific keywords in your code to improve visibility and readability.
- **Automatic Commenter**: Quickly add comments to your code, making it easier to understand and maintain.
- **Keyword Remover**: Remove specific keywords from your code with ease.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for `CodeSpectrum`.
4. Click the **Install** button.
5. Once installed, reload Visual Studio Code.

## Usage

### Highlighting Keywords

1. Open the Command Palette by pressing `Ctrl+Shift+P`.
2. Type `CodeSpectrum: Highlight Keywords` and select the command.
3. Enter the keywords you want to highlight, separated by commas.
4. Your specified keywords will be highlighted in the currently open files.

### Adding Comments

1. Select the text or code you want to comment.
2. Right-click and select `CodeSpectrum: Add Comment` from the context menu.
3. Alternatively, you can use the Command Palette:
   - Press `Ctrl+Shift+P`.
   - Type `CodeSpectrum: Add Comment` and select the command.
4. Enter your comment in the input box that appears.
5. Your comment will be added above the selected code.

### Removing Keywords

1. Open the Command Palette by pressing `Ctrl+Shift+P`.
2. Type `CodeSpectrum: Remove Keywords` and select the command.
3. Enter the keywords you want to remove, separated by commas.
4. The specified keywords will be removed from the currently open files.

## Extension Settings

CodeSpectrum provides the following settings to customize its behavior:

- `codespectrum.highlightColor`: Set the color used for highlighting keywords.
- `codespectrum.commentPrefix`: Define the prefix used for comments (default is `//` for most languages).
- `codespectrum.caseSensitive`: Enable or disable case sensitivity for keyword matching.

### Example Settings

```json
{
  "codespectrum.highlightColor": "#FFEB3B",
  "codespectrum.commentPrefix": "//",
  "codespectrum.caseSensitive": true
}
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request on the [GitHub repository](https://github.com/yourusername/CodeSpectrum).

## License

This extension is licensed under the MIT License. See the [LICENSE](https://github.com/yourusername/CodeSpectrum/blob/main/LICENSE) file for more information.

## Acknowledgments

- Special thanks to the VS Code community for their continuous support and contributions.
- Inspired by various code enhancement tools and plugins.

Enjoy coding with **CodeSpectrum**! If you have any questions or need further assistance, feel free to reach out.
