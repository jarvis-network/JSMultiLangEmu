'use strict';

const Sk = require('skulpt');
const echarts = require('echarts');
window.echarts = echarts;

const draw = (elQuery, option) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const canvas = body.querySelector(elQuery.v);
	console.log(Sk.ffi.remapToJs(option));
	let myChart = echarts.init(canvas);
	myChart.setOption(Sk.ffi.remapToJs(option));
};

module.exports = {
	draw
};
