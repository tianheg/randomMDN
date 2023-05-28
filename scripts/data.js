import fs from 'node:fs'
import got from 'got'

const allDocUrls = []

/**
 * Sitemap Handling
 */
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
    allDocUrls.push(match[1])
  }

  return allDocUrls
}

await getDocUrls()

console.log(allDocUrls)

// write to data.json file
fs.writeFileSync('data.json', JSON.stringify(allDocUrls))
