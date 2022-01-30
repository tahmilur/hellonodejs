// run : node ./test_view_pug.js
// 
const pug = require('pug');
const path = require('path');
var formidable = require('formidable');
const { publicDecrypt } = require('crypto');
const view_path = path.join(__dirname, "views");

console.log("welcome to view: pug!");
console.log(view_path + '\\test_template.pug');

// Compile the source code
const compiledFunction = pug.compileFile(view_path + '\\test_template.pug', {name: "test_template", cache:true});

// Render a set of data
console.log(compiledFunction({ name: 'Timothy' }));
// "<p>Timothy's Pug source code!</p>"

// Render another set of data
console.log(compiledFunction({ name: 'Forbes' }));
// "<p>Forbes's Pug source code!</p>"

// Compile template.pug, and render a set of data
console.log(pug.renderFile(view_path + '\\test_template.pug', { name: 'Tahmilur Rahman'  }));
// "<p>Timothy's Pug source code!</p>"