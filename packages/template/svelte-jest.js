/**
 * MIT License Copyright (c) 2018-2019 Rogier Spieker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation 
 * files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, 
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const svelte = require('svelte/compiler');
const deasync = require('deasync');

const styleRegex = /<style[^>]*>[\S\s]*?<\/style>/g;

const process = (options = {}) => (source, filename) => {
	const { preprocess, debug, compilerOptions, noStyles } = options;

  // strip out <style> tags to prevent errors with node-sass.
  const normalized = noStyles !== false ? source.replace(styleRegex, '') : source;
  
	let preprocessed;

	if (preprocess) {
		svelte
			.preprocess(normalized, preprocess || {}, {
				filename
			})
			.then((result) => (preprocessed = result.code));

		deasync.loopWhile(() => !preprocessed);
	} else {
		preprocessed = source;
	}

	const compiled = svelte.compile(preprocessed, {
		filename,
		css: false,
		// Allow tests to set component props.
		accessors: true,
		// Debugging and runtime checks
		dev: true,
		// Emit CommonJS that Jest can understand.
		format: 'cjs',
		...compilerOptions
	});

	// Fixes the '_Sample.default is not a constructor' error when importing in Jest.
	const esInterop =
		'Object.defineProperty(exports, "__esModule", { value: true });';

	const code = compiled.js.code + esInterop;

	if (debug) {
		console.log(code);
	}

	return {
		code,
		map: compiled.js.map
	};
};

exports.createTransformer = (options) => {
	return {
		process: process(options)
	};
};