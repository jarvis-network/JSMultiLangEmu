'use strict';

const {obj, arr} = require('iblokz-data');

// namespaces=
const counter = require('./counter');

// initial
const initial = {
	type: 'py',
	example: false,
	source: 'print "Hello World!"',
	examples: {
		js: {},
		py: {
			helloworld: {
				title: 'Hello World',
				source: 'print "Hello World!"'
			},
			dom: {
				title: 'DomExample',
				source: `
import dom
def callback():
  print "clicked"

dom.clear('#ui')
dom.create('label', 'l1', '#ui')
dom.set('#l1', 'innerHTML', 'Pick date/time:')
dom.create('input', 'i1', '#ui')
dom.attr('#i1', 'type', 'datetime-local')
print dom.attr('#i1', 'type')
# button
dom.create('button', 'b1', '#ui')
dom.set('#b1', 'innerHTML', 'click me')
dom.on('#b1', 'click', callback)
`
			}
		},
		java: {
			helloworld: {
				title: 'HelloWorldExample',
				source: `
public class HelloWorldExample {
	public static void main(String args[]){
		System.out.println("Hello World!");
	}
}`
			}
		}
	}
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

/*
public class HelloWorldExample {
  public static void main(String args[]){
    System.out.println("Hello World!");
  }
}
*/

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
	source: state.examples[state.type][example].source
});

const updateSource = source => state => obj.patch(state, 'source', source);

module.exports = {
	initial,
	counter,
	set,
	toggle,
	arrToggle,
	changeLanguage,
	loadExample,
	updateSource
};
