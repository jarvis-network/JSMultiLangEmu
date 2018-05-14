'use strict';

const getParent = (el, tagName) => (el.parentNode.tagName === tagName)
	? el.parentNode
	: getParent(el.parentNode, tagName);

const getElIndex = el => Array.from(el.parentNode.children).indexOf(el);

const getRangePoint = (el, offset) =>
	(el.nodeType === 3 || el.childNodes.length === 0)
		? ({el, offset: (el.textContent.length < offset) ? el.textContent.length : offset})
		: Array.from(el.childNodes).reduce(
			(rp, child) => (rp.el !== el)
				? rp
				: (child.textContent.length >= rp.offset)
					? getRangePoint(child, rp.offset)
					: {el, offset: rp.offset - child.textContent.length},
			{el, offset}
		);

const get = el => {
	let range = window.getSelection().getRangeAt(0);
	let parentLi = (range.startContainer.tagName === 'LI')
		? range.startContainer : getParent(range.startContainer, 'LI');
	let colRange = document.createRange();
	colRange.setStart(parentLi, 0);
	colRange.setEnd(range.startContainer, range.startOffset);
	const row = getElIndex(parentLi);
	const col = colRange.toString().length;
	return {
		row,
		col
	};
};

const set = (el, pos) => {
	const parentLi = Array.from(el.querySelectorAll('li'))[pos.row];
	const rp = getRangePoint(parentLi, pos.col);
	console.log(rp);
	let range = document.createRange();
	try {
		range.setStart(rp.el, rp.offset);
		range.setEnd(rp.el, rp.offset);
	} catch (e) {
		console.log(e);
		range.setStart(rp.el, 0);
		range.setEnd(rp.el, 0);
	}
	const sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
};

module.exports = {
	get,
	set
};
