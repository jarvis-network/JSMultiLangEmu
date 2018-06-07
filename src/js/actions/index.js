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
			},
			api: {
				title: 'APIExample',
				source: `
import api
import dom

url = 'http://quotesondesign.com/wp-json/posts' \\
	+ '?filter[orderby]=rand&filter[posts_per_page]=1'

def api_cb(res):
	dom.set('#q', 'innerHTML', res[0]['content'] \\
	+ ' - ' + res[0]['title'])

def btn_click():
	api.get(url, api_cb)

def init():
	dom.clear('#ui')
	dom.create('button', 'b1', '#ui')
	dom.create('div', 'q', '#ui')
	dom.set('#b1', 'innerHTML', 'get quote')
	dom.on('#b1', 'click', btn_click)

init()
	`
			},
			chart: {
				title: 'ChartExample',
				source: `
import chart
import dom

option = {
	'xAxis': {
		'type': 'category',
		'data': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	'yAxis':{
		'type': 'value'
	},
	'series': [{
		'data': [820, 932, 901, 934, 1290, 1330, 1320],
		'type': 'line'
	}]
}

def init():
	dom.clear('#ui')
	dom.create('canvas', 'my-chart', '#ui')
	dom.attr('#my-chart', 'width', 500)
	dom.attr('#my-chart', 'height', 300)
	chart.draw('#my-chart', option)

init()
	`
			},
			procloop: {
				title: 'ProcLoop',
				source: `
import proc

def print_msg ( index ):
	print 'index is:', index

proc.loop(10, 1, print_msg)

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
