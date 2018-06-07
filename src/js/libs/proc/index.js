'use strict';

const Sk = require('skulpt');

const loop = (reps, delay, cb) => {
	let index = 0;
	let interval = window.setInterval(
		() => (index < reps.v)
			? (index++, cb.tp$call([Sk.ffi.remapToPy(index)]))
			: clearInterval(interval),
		delay.v * 1000
	);
};

module.exports = {
	loop
};
