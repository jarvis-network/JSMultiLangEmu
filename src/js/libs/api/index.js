'use strict';

const Sk = require('skulpt');
// const request = require('superagent');

const get = (url, callback) =>
	fetch(url, {cache: "no-store"})
		.catch(err => console.log(err))
		.then(res => res.json())
		.then(res => (
			console.log({res}),
			// callback.tp$call([Sk.ffi.remapToPy(res)])
			callback(res)
		));

module.exports = {
	get
};
