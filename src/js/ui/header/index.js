'use strict';

const {obj} = require('iblokz-data');

// dom
const {
	h1, a, div, label, img,
	section, button, span,
	select, option, header
} = require('iblokz-snabbdom-helpers');
// components
const dropdown = require('../comp/dropdown');

const langTypes = {
	js: 'JavaScript',
	py: 'Python',
	java: 'Java'
};

module.exports = ({state, actions}) => header([
	img(`[src='assets/logo.jpg']`),
	h1('Playground'),
	label('Lang: '),
	dropdown('#change-lang', langTypes, state.type, ev => actions.changeLanguage(ev.target.value)),
	label('Examples: '),
	dropdown('#load-example',
		Object.assign({'': 'Load ...'}, obj.map(state.examples[state.type], (k, v) => k)), '',
		ev => {
			actions.loadExample(ev.target.value);
			ev.target.value = '';
		})
]);
