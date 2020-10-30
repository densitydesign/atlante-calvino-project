const fs = require('fs')
const filename = process.argv[2]
let svg = fs.readFileSync(filename, "UTF-8")
const hash = Math.random().toString(36).substring(7);
console.log("Using suffix " + hash)
svg = svg.replace(/(st\d)/g, "$1_" + hash)
fs.writeFileSync(filename, svg)
console.log("ClassNames fixed!")