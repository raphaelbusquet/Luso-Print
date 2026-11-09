// Apply translation only at display boundaries; identifiers, styles and form values stay unchanged.
const ts = require('typescript')
const fs = require('fs')
const path = require('path')
const root = path.resolve('src')
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name)
    if (fs.statSync(file).isDirectory()) { if (!file.includes('/i18n')) walk(file); continue }
    if (!file.endsWith('.tsx') || file.includes('/admin/') || name === 'AdminPage.tsx' || name === 'main.tsx') continue
    let source = fs.readFileSync(file, 'utf8')
    if (/translate as (?:t|tr)\b/.test(source)) continue
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const edits = []
    const textValue = raw => raw.split(/\r?\n/).map((line, i, all) => {
      let value = line.replace(/\t/g, ' ')
      if (i) value = value.replace(/^ +/, '')
      if (i < all.length - 1) value = value.replace(/ +$/, '')
      return value
    }).filter(Boolean).join(' ')
    function visit(node) {
      if (ts.isJsxText(node)) {
        const value = textValue(node.text)
        if (value.trim()) edits.push({ start: node.pos, end: node.end, text: `{t(${JSON.stringify(value)})}` })
      } else if (ts.isJsxExpression(node) && node.expression && !node.dotDotDotToken && !ts.isJsxAttribute(node.parent)) {
        edits.push({ start: node.expression.getStart(ast), end: node.expression.getStart(ast), text: 't(' })
        edits.push({ start: node.expression.end, end: node.expression.end, text: ')' })
      } else if (ts.isJsxAttribute(node) && ['alt', 'title', 'placeholder', 'aria-label'].includes(node.name.getText(ast)) && node.initializer) {
        const n = node.initializer
        if (ts.isStringLiteral(n)) edits.push({ start: n.getStart(ast), end: n.end, text: `{t(${JSON.stringify(n.text)})}` })
        else if (ts.isJsxExpression(n) && n.expression) {
          edits.push({ start: n.expression.getStart(ast), end: n.expression.getStart(ast), text: 't(' })
          edits.push({ start: n.expression.end, end: n.expression.end, text: ')' })
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(ast)
    if (!edits.length) continue
    edits.sort((a,b) => b.start - a.start || b.end - a.end)
    for (const edit of edits) source = source.slice(0, edit.start) + edit.text + source.slice(edit.end)
    const relative = path.relative(path.dirname(file), path.join(root, 'i18n/translate')).replaceAll(path.sep, '/')
    fs.writeFileSync(file, `import { translate as t } from '${relative.startsWith('.') ? relative : './' + relative}'\n` + source)
  }
}
walk(root)
