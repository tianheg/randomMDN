import fs from 'node:fs'
import rl from 'readline'
import got from 'got'

let allDocUrls = ''

const SITEMAP_URL =
  'https://developer.mozilla.org/sitemaps/en-us/sitemap.xml.gz'

/**
 * Get all MDN Web Documentation URLs
 *   - fetch MDN sitemap
 *   - unzip response
 *   - filter out non-web-documentation URLs
 *
 * @returns {Promise} A random URL from the MDN sitemap
 */
const getDocUrls = async () => {
  const SITEMAP_URL_REGEX = /<loc>(.*?)<\/loc>/g
  const { body } = await got(SITEMAP_URL, {
    responseType: 'buffer',
    headers: {
      'accept-encoding': 'gzip',
    },
  })
  const sitemap = body.toString()

  let match
  while ((match = SITEMAP_URL_REGEX.exec(sitemap))) {
    allDocUrls = allDocUrls.concat(match[1] + ',')
  }

  return allDocUrls
}

await getDocUrls()

// read randomNewTab.js first line
const readInterface = rl.createInterface({
  input: fs.createReadStream('./randomNewTab.js'),
  output: process.stdout,
  console: false,
})

const lines = []

readInterface.on('line', (line) => lines.push(line))

readInterface.on('close', () => {
  lines.splice(0, 1, `const MDN = [${allDocUrls.slice(0, -1).split(',').map((url) => `'${url}'`).join(', ')}]`)
  fs.writeFileSync('./randomNewTab.js', lines.join('\n'))
})
