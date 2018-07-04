'use strict';

const {obj, arr} = require('iblokz-data');

// namespaces=
// const counter = require('./counter');

// initial
const initial = {
	type: 'py',
	example: false,
	index: 0,
	maxIndex: 0,
	source: 'print "Hello World!"',
	pos: {
		start: {row: 0, col: 0},
		end: {row: 0, col: 0}
	},
	history: [
		{
			type: 'py',
			source: 'print "Hello World!"',
			pos: {
				start: {row: 0, col: 0},
				end: {row: 0, col: 0}
			}
		}
	],
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
	source: state.examples[state.type][example],
	index: state.index + 1,
	maxIndex: state.index + 1,
	pos: initial.pos,
	history: [].concat(
		state.history.slice(0, state.index + 1),
		[{
			type: state.type,
			source: state.examples[state.type][example],
			pos: initial.pos
		}]
	)
});

const updateSource = (source, pos = initial.pos) => state => Object.assign({}, state, {
	source,
	index: state.index + 1,
	maxIndex: state.index + 1,
	pos,
	history: [].concat(
		state.history.slice(0, state.index + 1),
		[{type: state.type, source, pos}]
	)
});

const updatePos = pos => state => Object.assign({}, state, {
	pos,
	history: [].concat(
		state.history.slice(0, state.history.length - 1),
		[obj.patch(state.history[state.history.length - 1], 'pos', pos)]
	)
});

const undo = () => state => Object.assign({}, state, {
	index: state.index > 0 ? state.index - 1 : 0
}, state.history[state.index > 0 ? state.index - 1 : 0]);

const redo = () => state => Object.assign({}, state, {
	index: state.index < state.maxIndex ? state.index + 1 : state.index
}, state.history[state.index < state.maxIndex ? state.index + 1 : state.index]);

module.exports = {
	initial,
	set,
	toggle,
	arrToggle,
	changeLanguage,
	loadExample,
	updateSource,
	updatePos,
	undo,
	redo
};
