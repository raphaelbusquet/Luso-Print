# Local translations

Portuguese is the original language. Spanish, French, Italian and English are shipped
with the website; no translation API, subscription, user-content uploads or extra
external script is used. The visitor explicitly selects a language, saved under
`lusoprint-language`. Unknown/new text falls back to Portuguese.

- `translations.tsv`: Portuguese / Spanish / French / Italian / English, separated by `|`.
- `diary-translations.json`: article titles, leads and paragraphs in the same language order.
- `messages.json`: generated dictionary, checked into the repository.
- `translate.ts`: display-only translation, preserving internal IDs and URLs.
- `LanguageRoot.tsx`: remounts the display when the language changes; existing basket,
  favourites and authentication persistence continue to work. Unsaved form drafts close.

Run `npm run i18n:build` after editing translations. Production builds also rebuild them.
Run `npm run i18n:test` for dictionary, price, language-storage and user-name checks.

When adding or changing public copy, add matching translations and use `t(text)` at
the display boundary. Do not translate IDs, routes, database values, input values,
user names or email addresses. Use `translateOrderNote` for mixed order configuration.
The initial `scripts/localize-jsx.cjs` migration is idempotent for files already using
translation. Prefer normal direct edits for new copy.

Brand names stay unchanged. Text already printed inside photographs is part of the
image and is not replaced. The private admin interface remains in Portuguese.
