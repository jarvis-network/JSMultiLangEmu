'use strict';

const {obj, arr} = require('iblokz-data');

// namespaces=
const counter = require('./counter');

// initial
const initial = {
	type: 'py',
	source: 'print "Hello World!"'
};

/*
def callback():
  print "clicked"

dom_clear('#ui')
dom_create('label', 'l1', '#ui')
dom_set('#l1', 'innerHTML', 'Pick date/time:')
dom_create('input', 'i1', '#ui')
dom_attr('#i1', 'type', 'datetime-local')
print dom_attr('#i1', 'type')
# button
dom_create('button', 'b1', '#ui')
dom_set('#b1', 'innerHTML', 'click me')
dom_on('#b1', 'click', callback)
*/

// actions
const set = (key, value) => state => obj.patch(state, key, value);
const toggle = key => state => obj.patch(state, key, !obj.sub(state, key));
const arrToggle = (key, value) => state =>
	obj.patch(state, key,
		arr.toggle(obj.sub(state, key), value)
	);

module.exports = {
	initial,
	counter,
	set,
	toggle,
	arrToggle
};
