'use strict';

// dom
const {
	h1, a, div,
	section, button, span,
	select, option, header
} = require('iblokz-snabbdom-helpers');
// components
const codebin = require('./codebin');

const langTypes = {
	js: 'JavaScript',
	py: 'Python',
	java: 'Java'
};

module.exports = ({state, actions}) => section('#ui', [
	header([
		h1('JSMultiLangEmu'),
		select({
			on: {
				change: ev => actions.set('type', ev.target.value)
			}
		}, Object.keys(langTypes).map(type =>
			option({attrs: {
				value: type,
				selected: type === state.type
			}}, langTypes[type])
		))
	]),
	codebin({
		source: state.source || '',
		type: state.type || 'js',
		change: source => actions.set('source', source)})
]);
