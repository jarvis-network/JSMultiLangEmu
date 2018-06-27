'use strict';

const fs = require('fs');
const path = require('path');
const Rx = require('rx');
const $ = Rx.Observable;

const readdir = $.fromNodeCallback(fs.readdir);
const readFile = $.fromNodeCallback(fs.readFile);
const writeFile = $.fromNodeCallback(fs.writeFile);

const examplesPath = path.resolve(__dirname, '../src/examples');
const outputPath = path.resolve(__dirname, '../dist/data/examples.json');

const filesInDir = dir => readdir(dir)
	.concatMap($.fromArray);

filesInDir(examplesPath)
	.concatMap(lang =>
		filesInDir(path.resolve(examplesPath, lang))
			.concatMap(name => readFile(path.resolve(examplesPath, lang, name), 'utf-8')
				.map(data => ({name, data}))
			)
			.reduce((list, {name, data}) => Object.assign({}, list, {[name]: data}), {})
			.map(list => ({lang, list}))
	)
	.reduce((examples, {lang, list}) => Object.assign({}, examples, {[lang]: list}), {})
	.map(contents => JSON.stringify(contents, null, 2))
	.flatMap(data => writeFile(outputPath, data, 'utf-8'))
	.catch(err => console.log('error', err))
	.subscribe(res => console.log('success', res));
