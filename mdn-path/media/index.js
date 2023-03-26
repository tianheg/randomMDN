// get all path under /files/en-us/web, write it into data.txt line by line
// Path: getMDNpath.js
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

async function getMDNpath() {
  const webPath = 'media'
  const response = await fetch(
    `https://api.github.com/repos/mdn/content/contents/files/en-us/web/${webPath}`
  )
  const files = await response.json()
  const paths = files.map((file) =>
    file.path.slice(6).replace(/\/index.md$/, '/')
  )
  const data = paths.join('\n')
  fs.writeFileSync(path.join(__dirname, 'data.txt'), data)
}

getMDNpath()
