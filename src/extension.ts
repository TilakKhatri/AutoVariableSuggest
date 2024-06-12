import * as vscode from "vscode";

const keywords = ["print", "import", "printf", "die"]; // Add your keywords here
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
  backgroundColor: "rgba(255,255,0,0.3)", // Yellow background
  border: "1px solid red", // Red border
});

async function removeKeywords(editor: vscode.TextEditor) {
  const document = editor.document;
  // const keywords = ["print", "import", "printf", "die"];
  // const regex = new RegExp(`(${keywords.join("|")})`, "gi");

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
  // const keywords = ["print", "import", "printf", "die"];
  // const regex = new RegExp(`(${keywords.join("|")})`, "gi");
  const ranges = getKeywordRanges(document, regex);

  for (const range of ranges) {
    const startPos = range.start;
    const endPos = range.end;
    const line = document.lineAt(startPos.line);
    const newText = `#`;
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

// function getKeywordRanges(editor: any) {
//   const document = editor.document;
//   const keywords = ["print", "import", "printf", "die"]; // Add your keywords here
//   const regex = new RegExp(`(${keywords.join("|")})`, "gi");
//   // console.log("regex", regex);
//   // Find all occurrences of the keywords
//   // const ranges: vscode.DecorationOptions[] = [];
//   const ranges = [];
//   let match;
//   while ((match = regex.exec(document.getText())) !== null) {
//     const startPos = document.positionAt(match.index);
//     const endPos = document.positionAt(match.index + match[0].length);
//     const range = new vscode.Range(startPos, endPos);
//     ranges.push({ range });
//   }
//   return ranges;
// }
export function getActiveFileLanguage(): Thenable<string | undefined> {
  return vscode.window.activeTextEditor
    ? Promise.resolve(vscode.window.activeTextEditor.document.languageId)
    : Promise.resolve(undefined);
}

export function deactivate() {}
