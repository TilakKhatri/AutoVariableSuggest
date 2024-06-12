import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.highlightKeywords",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      let ranges = getKeywordRanges(editor);
      editor.setDecorations(decorationType, ranges);
    }
  );

  context.subscriptions.push(disposable);

  let disposableRemoveKeyword = vscode.commands.registerCommand(
    "extension.removekeywords",
    async () => {
      vscode.window.showInformationMessage("Hello from removekeywords");
    }
  );
  context.subscriptions.push(disposableRemoveKeyword);

  let disposableCommentKeyword = vscode.commands.registerCommand(
    "extension.commentKeywords",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      vscode.window.showInformationMessage("Hello from comment keywords");
      // let ranges: vscode.DecorationOptions[] = getKeywordRanges(editor);
      const languageID = await getActiveFileLanguage().then(
        (languageId) => languageId
      );
      console.log(languageID);
      let ranges: any = getKeywordRanges(editor);
      console.log(ranges);
      // Iterate over each range and insert a comment around it
      for (const obj of ranges) {
        let range = obj.range;
        const startPos = range.c;
        const endPos = range.e;
        // console.log(startPos, endPos);

        await editor.edit((editBuilder) => {
          editBuilder.insert(startPos, "#");
          editBuilder.insert(endPos, "\n"); // Insert a newline after the keyword
        });
      }
    }
  );
  context.subscriptions.push(disposableCommentKeyword);
}
let decorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: "rgba(255,255,0,0.3)", // Yellow background
  border: "1px solid red", // Red border
});

function getKeywordRanges(editor: any) {
  const document = editor.document;
  const keywords = ["print", "import", "printf", "die"]; // Add your keywords here
  const regex = new RegExp(`(${keywords.join("|")})`, "gi");
  // console.log("regex", regex);
  // Find all occurrences of the keywords
  // const ranges: vscode.DecorationOptions[] = [];
  const ranges = [];
  let match;
  while ((match = regex.exec(document.getText())) !== null) {
    const startPos = document.positionAt(match.index);
    const endPos = document.positionAt(match.index + match[0].length);
    const range = new vscode.Range(startPos, endPos);
    ranges.push({ range });
  }
  return ranges;
}
export function getActiveFileLanguage(): Thenable<string | undefined> {
  return vscode.window.activeTextEditor
    ? Promise.resolve(vscode.window.activeTextEditor.document.languageId)
    : Promise.resolve(undefined);
}

export function deactivate() {}
