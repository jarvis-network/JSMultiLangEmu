'use strict';

const {obj, arr} = require('iblokz-data');

// namespaces=
// const counter = require('./counter');

// initial
const initial = {
	type: 'py',
	example: false,
	source: 'print "Hello World!"',
	examples: {
		js: {},
		py: {},
		java: {}
	}
};

// actions
const set = (key, value) => state => obj.patch(state, key, value);
const toggle = key => state => obj.patch(state, key, !obj.sub(state, key));
const arrToggle = (key, value) => state =>
	obj.patch(state, key,
		arr.toggle(obj.sub(state, key), value)
	);

const changeLanguage = type => state => Object.assign({}, state, {
	type,
	source: type !== state.type ? '' : state.source,
	example: type !== state.type ? false : state.example
});

const loadExample = example => state => Object.assign({}, state, {
	example,
	source: state.examples[state.type][example]
});

const updateSource = source => state => obj.patch(state, 'source', source);

module.exports = {
	initial,
	set,
	toggle,
	arrToggle,
	changeLanguage,
	loadExample,
	updateSource
};
