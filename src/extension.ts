import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.highlightKeywords",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const document = editor.document;
      const keywords = ["print", "import"]; // Add your keywords here
      const regex = new RegExp(`(${keywords.join("|")})`, "gi");
      // console.log("regex", regex);
      // Find all occurrences of the keywords
      const ranges: vscode.DecorationOptions[] = [];
      let match;
      while ((match = regex.exec(document.getText())) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);
        ranges.push({ range });
      }
      editor.setDecorations(decorationType, ranges);
    }
  );

  context.subscriptions.push(disposable);
}
let decorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: "rgba(255,255,0,0.3)", // Yellow background
  border: "1px solid red", // Red border
});
export function deactivate() {}
