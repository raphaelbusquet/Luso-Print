// Build the site's own dictionaries. No network, API keys or paid services.
const fs = require('node:fs')
const path = require('node:path')
const root = path.resolve(__dirname, '..')
const messages = {}
const lines = fs.readFileSync(path.join(root, 'src/i18n/translations.tsv'), 'utf8').split(/\r?\n/)
for (const [index, line] of lines.entries()) {
  if (!line || line.startsWith('#')) continue
  const [source, ...translations] = line.split('|')
  if (translations.length !== 4 || !source || translations.some(value => !value.trim())) throw Error(`Invalid translation at line ${index + 1}`)
  if (messages[source] && JSON.stringify(messages[source]) !== JSON.stringify(translations)) throw Error(`Conflicting translation: ${source}`)
  messages[source] = translations
}
const diary = JSON.parse(fs.readFileSync(path.join(root,'src/i18n/diary-translations.json'), 'utf8'))
const source = fs.readFileSync(path.join(root,'src/data/index.ts'),'utf8')
for (const [id, values] of Object.entries(diary)) {
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = source.match(new RegExp("id: '" + escape(id) + "',\\s*ttl: '((?:\\\\.|[^'])*)',[\\s\\S]*?lead: '((?:\\\\.|[^'])*)',\\s*body: `([^`]+)`"))
  if (!match) throw Error(`Missing journal source: ${id}`)
  const [,title,lead,body] = match
  messages[title] = values.titles
  messages[lead] = values.leads
  const paragraphs = body.split('\n\n')
  if (paragraphs.length !== values.paragraphs.length) throw Error(`Paragraph mismatch: ${id}`)
  paragraphs.forEach((text,index) => { messages[text] = values.paragraphs[index] })
}
for (const [source, translations] of Object.entries({...messages})) {
  messages[source.toUpperCase()] ??= translations.map(text => text.toUpperCase())
  messages[source.toLowerCase()] ??= translations.map(text => text.toLowerCase())
}
fs.writeFileSync(path.join(root,'src/i18n/messages.json'), JSON.stringify(messages,null,2)+'\n')
console.log(`${Object.keys(messages).length} translated phrases in Spanish, French, Italian and English.`)
