'use strict';

const Sk = require('skulpt');

const clear = elQuery => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery.v);
	el.innerHTML = '';
};

const create = (tagName, id, parentQuery) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = document.createElement(tagName.v);
	el.setAttribute('id', id.v);
	body.querySelector(parentQuery.v).appendChild(el);
};

const set = (elQuery, prop, value) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery.v);
	el[prop.v] = value.v;
};

const get = (elQuery, prop, value) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery.v);
	return el[prop.v];
};

const attr = (elQuery, attr, value) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery.v);
	console.log(value);
	if (value && value.v !== undefined) {
		el.setAttribute(attr.v, value.v);
	} else {
		return el.getAttribute(attr.v);
	}
};

const on = (elQuery, evName, callback) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery.v);
	el.addEventListener(evName.v, ev => callback.tp$call());
	console.log(callback);
};

const off = (elQuery, evName, callback) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery.v);
	el.removeEventListener(evName.v, ev => callback.tp$call());
	console.log(callback);
};

module.exports = {
	clear,
	create,
	set,
	get,
	attr,
	on,
	off
};
