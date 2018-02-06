const hashcade = require('./src/hashcade')

// ------------------------------------------------------------
// Basic 512-bit hash example - hashcade is based on function: keccak512("Hello World!")
// ------------------------------------------------------------
let data = new Buffer("Hello World!", 'utf8')
let hashBasic512 = hashcade.hashBasic512(data)

console.log('Basic 512-bit hash from "' + data.toString() + '" is\n' + hashBasic512 + '\n')
// ------------------------------------------------------------

// ------------------------------------------------------------
// Double password 512-bit hash example
// ------------------------------------------------------------
let pass1 = new Buffer("super_secre_password", 'utf8')
let pass2 = new Buffer("hiper_secure_password", 'utf8')

let doublePassword512 = hashcade.hash(pass1, pass2, 512)

console.log('Double password 512-bit hash from "' + pass1.toString() + '" and "' + pass2 + '" is:\n' + doublePassword512 + '\n')
// ------------------------------------------------------------

// ------------------------------------------------------------
// Double password 16-bit hash example
// ------------------------------------------------------------
let hashTiny16 = hashcade.hashTiny16(pass1, pass2)

console.log('Double password 16-bit hash from "' + pass1.toString() + '" and "' + pass2 + '" is:\n' + hashTiny16 + '\n')
// ------------------------------------------------------------

// ------------------------------------------------------------
// Double password 32-bit hash example
// ------------------------------------------------------------
let hashTiny32 = hashcade.hashTiny32(pass1, pass2)

console.log('Double password 32-bit hash from "' + pass1.toString() + '" and "' + pass2 + '" is:\n' + hashTiny32 + '\n')
// ------------------------------------------------------------