const js_sha3 = require('js-sha3')
const js_sha512 = require('js-sha512')
const js_sha256 = require('js-sha256')
const js_crc = require('js-crc')

let hashcade = (function() {
	let module = {}

	const finalizers = {
		224: ['5', '9', 'b', 'f'],
		256: ['0', '4', '8', 'a', 'e'],
		384: ['3', '7', 'd'],
		512: ['1', '2', '6', 'c']
	}

	module.hash = (data1, data2, output_size) => {
		if (!(data1 instanceof Buffer)) {
			error("Parameter 'data1': is not Buffer!")
		}

		if (!(data2 instanceof Buffer)) {
			error("Parameter 'data2': is not Buffer!")
		}

		if (data1.length < 1) {
			error("Parameter 'data1': is empty!")
		}

		if (data2.length < 1) {
			error("Parameter 'data2': is empty!")
		}

		return hash(data1, data2, output_size)
	}

	module.hashTiny16 = (data1, data2) => {
		if (!(data1 instanceof Buffer)) {
			error("Parameter 'data1': is not Buffer!")
		}

		if (!(data2 instanceof Buffer)) {
			error("Parameter 'data2': is not Buffer!")
		}

		if (data1.length < 1) {
			error("Parameter 'data1': is empty!")
		}

		if (data2.length < 1) {
			error("Parameter 'data2': is empty!")
		}

		let hashcade = new Buffer(js_sha3.keccak512(js_sha3.keccak512(Buffer.concat([data1, data2]))))

		return js_crc.crc16(Buffer.concat([data1, data2, hashcade, new Buffer(hash(data1, data2, 512))]))
	}

	module.hashTiny32 = (data1, data2) => {
		if (!(data1 instanceof Buffer)) {
			error("Parameter 'data1': is not Buffer!")
		}

		if (!(data2 instanceof Buffer)) {
			error("Parameter 'data2': is not Buffer!")
		}

		if (data1.length < 1) {
			error("Parameter 'data1': is empty!")
		}

		if (data2.length < 1) {
			error("Parameter 'data2': is empty!")
		}

		let hashcade = new Buffer(js_sha3.keccak512(js_sha3.keccak512(data1.toString() + data2.toString())))

		return js_crc.crc32(Buffer.concat([data1, data2, hashcade, new Buffer(hash(data1, data2, 512))]))
	}

	module.hashBasic224 = data => {
		return module.hashBasic(data, 224)
	}

	module.hashBasic256 = data => {
		return module.hashBasic(data, 256)
	}

	module.hashBasic384 = data => {
		return module.hashBasic(data, 384)
	}

	module.hashBasic512 = data => {
		return module.hashBasic(data, 512)
	}

	module.hashBasic = (data, output_size) => {
		if (!(data instanceof Buffer)) {
			error("Parameter 'data': is not Buffer!")
		}

		if (data.length < 1) {
			error("Parameter 'data': is empty!")
		}

		return hash(data, data, output_size)
	}

	function hash(data1, data2, output_size) {
		let hashcade = new Buffer(js_sha3.keccak512(js_sha3.keccak512(data1.toString() + data2.toString())))

		let hashcade_str = hashcade.toString('hex')
		
		if (finalizers[output_size].indexOf(hashcade_str[hashcade_str.length - 1]) == -1) {
			let sum = 0

			for (let i = 0; i < hashcade_str.length; i++) {
				sum += hashcade_str[i].charCodeAt(0)
			}

			hashcade_str += finalizers[output_size][sum % 4]
		}

		let ret = ""

		for (let i = 0; i < hashcade_str.length; i++) {
			let input = Buffer.concat([data1, data2, hashcade, new Buffer(ret)]).toString()

			switch (hashcade_str[i]) {
				case '0':
					ret = js_sha3.shake128(input, 256)
					break
				case '1':
					ret = js_sha3.shake256(input, 512)
					break
				case '2':
					ret = js_sha3.keccak512(input)
					break
				case '3':
					ret = js_sha3.keccak384(input)
					break
				case '4':
					ret = js_sha3.keccak256(input)
					break
				case '5':
					ret = js_sha3.keccak224(input)
					break
				case '6':
					ret = js_sha3.sha3_512(input)
					break
				case '7':
					ret = js_sha3.sha3_384(input)
					break
				case '8':
					ret = js_sha3.sha3_256(input)
					break
				case '9':
					ret = js_sha3.sha3_224(input)
					break
				case 'a':
					ret = js_sha512.sha512_256(input)
					break
				case 'b':
					ret = js_sha512.sha512_224(input)
					break
				case 'c':
					ret = js_sha512.sha512(input)
					break
				case 'd':
					ret = js_sha512.sha384(input)
					break
				case 'e':
					ret = js_sha256.sha256(input)
					break
				case 'f':
					ret = js_sha256.sha224(input)
					break
			}
		}

		return ret
	}

	function error(text) {
		console.log(text)
		process.exit(-1)
	}

    return module
})()

module.exports = hashcade