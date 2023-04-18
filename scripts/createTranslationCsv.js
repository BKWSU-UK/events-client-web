const fs = require("fs")
const { translationsGB } = require('../src/i18n_gb')

const tsv = Object.entries(translationsGB).map(e => `${e[0]}\t${e[1]}`).join("\r\n")

fs.writeFileSync("translations.tsv", tsv)

