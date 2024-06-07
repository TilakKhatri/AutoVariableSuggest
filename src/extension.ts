import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Your extension "keyword-detector" is now active!');

  let disposable = vscode.commands.registerCommand(
    "keyword-detector.scan",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const text = document.getText();

        const keywords = ["die", "print_r()"];
        const keywordPattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");

        const diagnostics: vscode.Diagnostic[] = [];

        let match;
        while ((match = keywordPattern.exec(text))) {
          const startPos = document.positionAt(match.index);
          const endPos = document.positionAt(match.index + match[0].length);
          const range = new vscode.Range(startPos, endPos);

          const diagnostic = new vscode.Diagnostic(
            range,
            `Keyword '${match[0]}' detected. Please remove it before deployment.`,
            vscode.DiagnosticSeverity.Warning
          );

          diagnostics.push(diagnostic);
        }

        const diagnosticCollection =
          vscode.languages.createDiagnosticCollection("keyword-detector");
        diagnosticCollection.set(document.uri, diagnostics);

        vscode.window.showInformationMessage("Keyword scan complete!");
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
