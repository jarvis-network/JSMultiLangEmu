'use strict';

// dom
const {
	h1, a, div, h2, h3,
	section, button, span, canvas,
	label, input, form, select, option,
	table, thead, tbody, tr, td, th
} = require('iblokz-snabbdom-helpers');

module.exports = (sel, source, selected, cb, opts = {}) =>
	select(sel, Object.assign({
		on: {
			change: ev => cb(ev)
		},
		props: {
			value: selected
		}
	}, opts),
		(source instanceof Array
			? source.map(v => [v, v])
			: Object.keys(source).map(k => [k, source[k]])
		).map(([value, text]) =>
			option({
				attrs: {
					value,
					selected: value === selected
				}
			}, text)
		)
	);
