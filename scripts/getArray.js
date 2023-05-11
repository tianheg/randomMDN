import readline from 'readline'
import fs from 'fs'

const readInterface = readline.createInterface({
  input: fs.createReadStream('./scripts/data.txt'),
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
    './scripts/mdnArray.js',
    `const MDN = ${JSON.stringify(lines)};`
  )
})
