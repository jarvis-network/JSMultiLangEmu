'use strict';

// dom
const {
	h1, a, div,
	section, button, span,
	select, option
} = require('iblokz-snabbdom-helpers');
// components
const header = require('./header');
const codebin = require('./codebin');

module.exports = ({state, actions}) => section('#ui', [
	header({state, actions}),
	codebin({
		source: state.source || '',
		type: state.type || 'js',
		change: source => actions.set('source', source)})
]);
