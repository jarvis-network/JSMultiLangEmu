'use strict';

const Sk = require('skulpt');
const echarts = require('echarts');
window.echarts = echarts;

const draw = (elQuery, option) => {
	const body = document.querySelector('.output > iframe').contentWindow.document;
	const canvas = body.querySelector(elQuery);
	// console.log(Sk.ffi.remapToJs(option));
	let myChart = echarts.init(canvas);
	myChart.setOption(option);
	let update = option => {
		console.log(option);
		myChart.setOption(option);
	};
	return update;
};

module.exports = {
	draw
};
