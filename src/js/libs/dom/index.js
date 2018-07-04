'use strict';

const Sk = require('skulpt');

const clear = elQuery => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery);
	el.innerHTML = '';
};

const create = (tagName, id, parentQuery) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = document.createElement(tagName);
	el.setAttribute('id', id);
	body.querySelector(parentQuery).appendChild(el);
};

const set = (elQuery, prop, value) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery);
	el[prop] = value;
};

const get = (elQuery, prop, value) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery);
	return el[prop];
};

const attr = (elQuery, attr, value) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery);
	console.log(value);
	if (value !== undefined) {
		if (value === 'true') value = true;
		if (value === 'false') value = false;
		if (value === false) el.removeAttribute(attr);
		else el.setAttribute(attr, value);
	} else {
		return el.getAttribute(attr);
	}
};

const on = (elQuery, evName, callback) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery);
	el.addEventListener(evName, ev => (
		(callback instanceof Function)
			? callback()
			: callback.callback ? callback.callback() : {}
	));
	// console.log(callback);
};

const off = (elQuery, evName, callback) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const el = body.querySelector(elQuery);
	el.removeEventListener(evName, ev => (
		(callback instanceof Function)
			? callback()
			: callback.callback ? callback.callback() : {}
	));
	// console.log(callback);
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
