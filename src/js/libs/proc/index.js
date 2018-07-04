'use strict';

const Sk = require('skulpt');

const loop = (reps, delay, callback) => {
	let index = 0;
	let interval = window.setInterval(
		() => (index < reps)
			? (index++, (callback instanceof Function)
					? callback(index)
					: callback.callback ? callback.callback(index) : {})
			: clearInterval(interval),
		delay * 1000
	);
};

module.exports = {
	loop
};
