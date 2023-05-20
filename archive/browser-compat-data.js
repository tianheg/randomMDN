import fs from 'node:fs'
import bcd from '@mdn/browser-compat-data' assert { type: 'json' }

const mdnUrls = []
// console.log(bcd)

// api, css, html, http, javascript, mathml, svg, webdriver, webextensions

function getUrls(obj) {
  if (obj && typeof obj === 'object') {
    if (obj.mdn_url) {
      mdnUrls.push(obj.mdn_url)
    }
    Object.values(obj).forEach(getUrls)
  }
}
getUrls(bcd)

console.log(mdnUrls)
// write to data.txt file
fs.writeFileSync('./scripts/data.txt', mdnUrls.join('\n'))
