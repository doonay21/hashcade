const hashcade = require('./src/hashcade')
//hashcade.debug = true

// ------------------------------------------------------------
// Simplified 512-bit hash example - hashcade is based on function: keccak512("Hello World!")
// ------------------------------------------------------------
let data = new Buffer("Hello World!", 'utf8')
let simplified512 = hashcade.simplified512(data)

console.log('Simplified 512-bit hash from "' + data.toString() + '" is\n' + simplified512 + '\n')
// ------------------------------------------------------------

// ------------------------------------------------------------
// Double password 512-bit hash example
// ------------------------------------------------------------
let pass1 = new Buffer("super_secre_password", 'utf8')
let pass2 = new Buffer("hiper_secure_password", 'utf8')

let doublePassword512 = hashcade.fullHash(pass1, pass2, 512)

console.log('Double password 512-bit hash from "' + pass1.toString() + '" and "' + pass2 + '" is:\n' + doublePassword512 + '\n')
// ------------------------------------------------------------

// ------------------------------------------------------------
// Custom 512-bit hash example
// ------------------------------------------------------------
let customHashcade = new Buffer("423a35c7", 'hex')

let custom512 = hashcade.fullHash(data, customHashcade, 512)

console.log('Custom 512-bit hash from "' + data.toString() + '" with custom hashcade "' + customHashcade.toString('hex') + '" is:\n' + custom512)
// ------------------------------------------------------------