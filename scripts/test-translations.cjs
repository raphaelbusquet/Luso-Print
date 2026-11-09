const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const catalog = require('../src/i18n/messages.json')
const store = new Map()
const storage = { getItem: key => store.get(key) ?? null, setItem: (key,value) => store.set(key,value) }
const document = { documentElement: { lang: '' } }
const exportsObject = {}
const code = ts.transpileModule(fs.readFileSync('src/i18n/translate.ts','utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText
vm.runInNewContext(code, { exports: exportsObject, require: name => { assert.equal(name, './messages.json'); return catalog }, localStorage: storage, document, Map, Set, RegExp })
const { translate: t, translateOrderNote, setLanguage, getLanguage, subscribeLanguage } = exportsObject
let updates = 0
const unsubscribe = subscribeLanguage(() => updates++)
for (const language of ['es','fr','it','en']) {
  setLanguage(language)
  assert.equal(getLanguage(), language)
  assert.equal(document.documentElement.lang, language)
  for (const [source, translations] of Object.entries(catalog)) {
    assert.equal(translations.length, 4, source)
    assert.ok(translations.every(value => typeof value === 'string' && value.trim()), source)
    assert.equal(t(source), translations[['es','fr','it','en'].indexOf(language)], source)
  }
  assert.equal(t(39), 39)
  assert.equal(t('€39'), '€39')
  assert.equal(t('/assets/products/sala/vaso-onda-1.png'), '/assets/products/sala/vaso-onda-1.png')
}
setLanguage('en')
assert.equal(t('Cor da bandeja 2: branco'), 'Tray colour 2: white')
assert.equal(t('  Ver detalhes  '), '  View details  ')
assert.equal(t('Total: €109'), 'Total: €109')
assert.equal(t('20 cm e 15 cm · Desde €59'), '20 cm and 15 cm · From €59')
assert.equal(t('Kit com 2 bandejas · Bandeja 1: branco · Bandeja 2: preto'), 'Set of 2 trays · Tray 1: white · Tray 2: black')
assert.equal(t('Quadro com 2 Pets'), 'Frame with 2 Pets')
assert.equal(translateOrderNote('Nome: Branco · Bandeja 1: branco'), 'Name: Branco · Tray 1: white')
assert.equal(t('Há companheiros que fazem parte da família. Um quadro com busto em relevo do seu cão ou gato, pensado para dar um lugar especial a esse carinho na decoração da sua casa. Uma peça personalizada para celebrar o seu melhor amigo ou oferecer a quem partilha a vida com animais.'), 'Some companions are part of the family. A frame with relief bust of your dog or cat, designed to give that affection a special place in your home. A personalised piece to celebrate your best friend or give to someone who shares their life with animals.')
setLanguage('pt')
assert.equal(document.documentElement.lang, 'pt-PT')
assert.equal(t('Ver detalhes'), 'Ver detalhes')
assert.equal(store.get('lusoprint-language'), 'pt')
assert.equal(updates, 5)
unsubscribe()
console.log(`Passed: ${Object.keys(catalog).length} phrases in all four languages, dynamic labels, prices, persistence and Portuguese fallback.`)
