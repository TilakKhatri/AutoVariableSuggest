import * as vscode from "vscode";

const keywords = ["abort", "exit", "Exit", "die"];
const regex = new RegExp(`(${keywords.join("|")})`, "gi");

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.highlightKeywords",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }
      const document = editor.document;
      let ranges = getKeywordRanges(document, regex);
      editor.setDecorations(decorationType, ranges);
    }
  );

  context.subscriptions.push(disposable);

  let disposableRemoveKeywords = vscode.commands.registerCommand(
    "extension.removekeywords",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      await removeKeywords(editor);
      return;
    }
  );
  context.subscriptions.push(disposableRemoveKeywords);

  let disposableCommentKeywords = vscode.commands.registerCommand(
    "extension.commentKeywords",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      await commentOutLinesContainingKeywords(editor);
    }
  );
  context.subscriptions.push(disposableCommentKeywords);
}
let decorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: "rgba(255,255,0,0.7)", // Yellow background
  border: "1px solid red", // Red border
  color: "black",
});

async function removeKeywords(editor: vscode.TextEditor) {
  const document = editor.document;
  let match;
  while ((match = regex.exec(document.getText())) !== null) {
    const startPos = document.positionAt(match.index);
    const endPos = document.positionAt(match.index + match[0].length);
    await editor.edit((editBuilder) =>
      editBuilder.delete(new vscode.Range(startPos, endPos))
    );
  }
}

async function commentOutLinesContainingKeywords(editor: vscode.TextEditor) {
  const document = editor.document;
  const ranges = getKeywordRanges(document, regex);
  const language = await getActiveFileLanguage();
  console.log("language: ", language);
  let languages = [
    "python",
    "javascript",
    "c",
    "c++",
    "java",
    "php",
    "go",
    "rust",
  ];
  for (const range of ranges) {
    const startPos = range.start;
    const endPos = range.end;
    const line = document.lineAt(startPos.line);
    let newText = `#`;
    if (language === "python") {
      newText = `#`;
    } else if (language === "javascript") {
      newText = `//`;
    } else if (language === "c") {
      newText = `//`;
    } else if (language === "c++") {
      newText = `//`;
    } else if (language === "java") {
      newText = `//`;
    } else {
      newText = `--`;
    }
    await editor.edit((editBuilder) =>
      editBuilder.replace(new vscode.Range(startPos, startPos), newText)
    );
  }
}

function getKeywordRanges(
  document: vscode.TextDocument,
  regex: RegExp
): vscode.Range[] {
  const ranges: vscode.Range[] = [];
  let match;
  while ((match = regex.exec(document.getText())) !== null) {
    const startPos = document.positionAt(match.index);
    const endPos = document.positionAt(match.index + match[0].length);
    ranges.push(new vscode.Range(startPos, endPos));
  }
  return ranges;
}

export function getActiveFileLanguage(): Thenable<string | undefined> {
  return vscode.window.activeTextEditor
    ? Promise.resolve(vscode.window.activeTextEditor.document.languageId)
    : Promise.resolve(undefined);
}

export function deactivate() {}
