import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "autovariablegen" is now active!'
  );

  let disposable = vscode.commands.registerCommand(
    "autovariablegen.helloWorld",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const selection = editor.selection;
        const text = document.getText(selection);

        if (text) {
          const relatedVariables = generateRelatedVariables(text);
          editor.edit((editBuilder) => {
            const position = selection.end;
            relatedVariables.forEach((variable) => {
              editBuilder.insert(position, `\n${variable}`);
            });
          });
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

function generateRelatedVariables(baseVariable: string): string[] {
  // Example logic to generate related variables
  const variableBase = baseVariable.replace(/([A-Z])/g, "_$1").toLowerCase();
  return [
    `${variableBase}_count`,
    `${variableBase}_list`,
    `${variableBase}_map`,
  ];
}

// This method is called when your extension is deactivated
export function deactivate() {}
