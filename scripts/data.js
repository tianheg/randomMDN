import fs from 'node:fs'
import rl from 'node:readline'
import got from 'got'

let webDocUrls
const SITEMAP_URL =
  'https://developer.mozilla.org/sitemaps/en-us/sitemap.xml.gz'
const WEB_PATH = 'https://developer.mozilla.org/en-US/docs/Web'

const onlyAllowWebUrls = (url) => url.startsWith(WEB_PATH)

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
  const allDocUrls = []

  let match
  while ((match = SITEMAP_URL_REGEX.exec(sitemap))) {
    allDocUrls.push(match[1])
  }

  webDocUrls = allDocUrls.filter(onlyAllowWebUrls);

  return webDocUrls
}

await getDocUrls()

// read randomNewTab.js first line
const readInterface = rl.createInterface({
  input: fs.createReadStream('./randomNewTab.js'),
  output: process.stdout,
  terminal: false
})

const lines = []

readInterface.on('line', (line) => lines.push(line))

readInterface.on('close', () => {
  lines.splice(0, 1, `const MDN = [${webDocUrls.map((url) => `'${url}'`).join(', ')}]`)
  fs.writeFileSync('./randomNewTab.js', lines.join('\n'))
})
