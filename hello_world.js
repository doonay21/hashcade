const hashcade = require('./src/hashcade')
hashcade.debug = true

let hash = hashcade.hash(new Buffer("Hello World!"), new Buffer("ff", 'hex'))

console.log(hash)