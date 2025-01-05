const vscode = require('vscode')
const fs = require('fs')
/**
 * @param {vscode.ExtensionContext} context
 */

function indentSize(s1){
  lines = s1.split(/\r?\n/g)
  indentDifs = {}
  indent0 = 0
  for(line of lines){
      lineTrim = line.trimLeft()
      if(! lineTrim) continue  
      indent1 = line.length - lineTrim.length
      indentDif = indent1 - indent0
      indent0 = indent1
      if(indentDif<=0) continue
      if(!indentDifs[indentDif]) indentDifs[indentDif] = 1
      else indentDifs[indentDif] += 1
  }
  
  indentList = Object.entries(indentDifs)
  indentList.sort((x,y)=>(y[1]-x[1]))
  console.log(indentList)
  return indentList[0][0]
}

function cgf001(context) {
  const editor1 = vscode.window.activeTextEditor
  if(!editor1) return
  const doc1 = editor1.document
  const txt1 = doc1.getText()
  const N = indentSize(txt1)
  const re1 = eval(`/(?<=^\\s*?) {${N}}/gm`)
  const txt2 = txt1.replaceAll(re1,'\t').replaceAll('\t','|\t')
  const filePath2 = doc1.uri.fsPath + '.txt'
  fs.writeFileSync(filePath2, txt2, 'utf8')
  console.log(filePath2)
  vscode.window.showInformationMessage(filePath2)
}

function activate(context) {
  let disposable = vscode.commands.registerCommand('cgExt005run', (context)=>{cgf001(context)} );
  context.subscriptions.push(disposable);
}

function deactivate() {
  console.log('Your extension "cgExt005" is now deactivated.');
}

module.exports = {
  activate,
  deactivate,
};
