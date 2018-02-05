const js_sha3 = require('js-sha3')
const js_sha512 = require('js-sha512')
const js_sha256 = require('js-sha256')
const js_crc = require('js-crc')

let hashcade = (function() {
	let module = {}
	module.debug = false

	const finalizers = {
		224: ['5', '9', 'b', 'f'],
		256: ['0', '4', '8', 'a', 'e'],
		384: ['3', '7', 'd'],
		512: ['1', '2', '6', 'c']
	}
	
	module.fullHash = (data, hashcade, output_size) => {
		if (!(data instanceof Buffer)) {
			error("Parameter 'data': is not Buffer!")
		}

		if (!(hashcade instanceof Buffer)) {
			error("Parameter 'hashcade': is not Buffer!")
		}

		if (data.length < 1) {
			error("Parameter 'data': is empty!")
		}

		if (hashcade.length < 1) {
			error("Parameter 'hashcade': is empty!")
		}

		return hash(data, hashcade, output_size)
	}

	module.secureTiny16 = (data, hashcade) => {
		if (!(data instanceof Buffer)) {
			error("Parameter 'data': is not Buffer!")
		}

		if (!(hashcade instanceof Buffer)) {
			error("Parameter 'hashcade': is not Buffer!")
		}

		if (data.length < 1) {
			error("Parameter 'data': is empty!")
		}

		if (hashcade.length < 1) {
			error("Parameter 'hashcade': is empty!")
		}

		// ToDo crc 16

		return hash(data, hashcade, output_size)
	}

	module.secureTiny16 = (data, hashcade) => {
		// ToDo crc 32
	}

	module.simplified224 = data => {
		return module.simplified(data, 224)
	}

	module.simplified256 = data => {
		return module.simplified(data, 256)
	}

	module.simplified384 = data => {
		return module.simplified(data, 384)
	}

	module.simplified512 = data => {
		return module.simplified(data, 512)
	}

	module.simplified = (data, output_size) => {
		if (!(data instanceof Buffer)) {
			error("Parameter 'data': is not Buffer!")
		}

		if (data.length < 1) {
			error("Parameter 'data': is empty!")
		}

		return hash(data, new Buffer(js_sha3.keccak512(data.toString()), 'hex'), output_size)
	}

	function hash(data, hashcade, output_size) {
		let hashcade_str = hashcade.toString('hex')
		
		debug("Input: " + data.toString())
		debug("Hashcade pre: " + hashcade_str)

		if (finalizers[output_size].indexOf(hashcade_str[hashcade_str.length - 1]) == -1) {
			let data_hash = js_sha3.keccak512(data.toString('hex'))
			let sum = 0

			for (let i = 0; i < data_hash.length; i++) {
				sum += data_hash[i].charCodeAt(0)
			}

			hashcade_str += finalizers[output_size][sum % 4]

			debug("Finalizer generated")
		}

		debug("Hashcade post: " + hashcade_str)
		debug("Rounds: " + hashcade_str.length)

		let ret = ""

		for (let i = 0; i < hashcade_str.length; i++) {
			debug("--------------------")
			debug("")
			debug("Round " + (i + 1))
			debug("")

			let input = Buffer.concat([data, hashcade, new Buffer(ret)])

			switch (hashcade_str[i]) {
				case '0':
					debug("Algorithm: shake123-256")
					ret = js_sha3.shake128(input, 256)
					break
				case '1':
					debug("Algorithm: shake256-512")
					ret = js_sha3.shake256(input, 512)
					break
				case '2':
					debug("Algorithm: keccak512")
					ret = js_sha3.keccak512(input)
					break
				case '3':
					debug("Algorithm: keccak384")
					ret = js_sha3.keccak384(input)
					break
				case '4':
					debug("Algorithm: keccak256")
					ret = js_sha3.keccak256(input)
					break
				case '5':
					debug("Algorithm: keccak224")
					ret = js_sha3.keccak224(input)
					break
				case '6':
					debug("Algorithm: sha3_512")
					ret = js_sha3.sha3_512(input)
					break
				case '7':
					debug("Algorithm: sha3_384")
					ret = js_sha3.sha3_384(input)
					break
				case '8':
					debug("Algorithm: sha3_256")
					ret = js_sha3.sha3_256(input)
					break
				case '9':
					debug("Algorithm: sha3_224")
					ret = js_sha3.sha3_224(input)
					break
				case 'a':
					debug("Algorithm: sha512_256")
					ret = js_sha512.sha512_256(input)
					break
				case 'b':
					debug("Algorithm: sha512_224")
					ret = js_sha512.sha512_224(input)
					break
				case 'c':
					debug("Algorithm: sha512")
					ret = js_sha512.sha512(input)
					break
				case 'd':
					debug("Algorithm: sha384")
					ret = js_sha512.sha384(input)
					break
				case 'e':
					debug("Algorithm: sha256")
					ret = js_sha256.sha256(input)
					break
				case 'f':
					debug("Algorithm: sha224")
					ret = js_sha256.sha224(input)
					break
			}

			debug("OUT: " + ret + "\n")
		}

		debug("--------------------")
		debug("Generated hash: " + ret)
		debug("--------------------\n")

		return ret
	}

	function debug(text) {
		if (module.debug) {
			console.log(text)
		}
	}

	function error(text) {
		console.log(text)
		process.exit(-1)
	}

    return module
})()

module.exports = hashcade