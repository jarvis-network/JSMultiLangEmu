'use strict';

const Sk = require('skulpt');

const prepFunc = func => (...args) => {
	// console.log(func, args);
	args = args.map(arg => {
		switch (typeof arg) {
			default:
				return arg.v;
			case 'object':
				if (Sk.builtin.checkCallable(arg)) {
					// console.log(arg, arg.toString());
					// arg.tp$call
					return (..._args) => {
						// console.log(_args);
						// Sk.misceval.applyOrSuspend(arg, undefined, undefined, undefined, _args.map(_a => Sk.ffi.remapToPy(_a)));
						arg.tp$call(_args.map(_a => Sk.ffi.remapToPy(_a)));
					};
				}
				return Sk.ffi.remapToJs(arg);
		}
	});
	// console.log(args);
	let res = func(...args);
	if (res instanceof Function) return (..._args) => {
		console.log('12', _args);
		_args = _args.map(_a => Sk.ffi.remapToJs(_a));
		console.log('34', _args);
		return res(..._args);
	};
	if (typeof res === 'object') Sk.ffi.remapToPy(res);
	return Sk.ffi.remapToPy(res);
};

const build = (Sk, name, lib) => {
	Sk.builtinFiles.files[`src/lib/${name}/__init__.js`] = `
		var $builtinmodule = function(name)
		{
			var mod = {};

			const prepFunc = ${prepFunc.toString()}

			Sk.${name} = {};
` +
			Object.keys(lib).map(func => `
			mod.${func} = prepFunc(${lib[func].toString()})
`) + `

			return mod;
		}
		`;
};

module.exports = {
	build
};
