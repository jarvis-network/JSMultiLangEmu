'use strict';

const Sk = require('skulpt');

const loop = (reps, delay, cb) => {
	let index = 0;
	let interval = window.setInterval(
		() => (index < reps)
			? (index++, cb(index))
			: clearInterval(interval),
		delay * 1000
	);
};

module.exports = {
	loop
};
