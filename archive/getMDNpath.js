// read txt file line by line and generate a MDN array
// Path: mdn-path/getMDNarray.js
// Compare this snippet from mdn-path/manifest copy/index.js:
// // read txt file line by line and generate a MDN array
// // Path: getMDNarray.js

const readline = require('readline')
const fs = require('node:fs')

// const readStream = fs.createReadStream('./mdn-path/mergedData.txt', 'utf8')
// const writeStream = fs.createWriteStream('./mdn-path/mdnArray.js')
const readInterface = readline.createInterface({
  input: fs.createReadStream('./mdn-path/mergedData.txt'), // 更改为您的文件名
  output: process.stdout,
  console: false,
})

const lines = []

readInterface.on('line', function (line) {
  lines.push(line)
})

readInterface.on('close', function () {
  console.log(lines)
  fs.writeFileSync(
    './mdn-path/mdnArray.js',
    `const MDN = ${JSON.stringify(lines)};`
  )
})
