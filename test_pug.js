const express = require('express');
const path = require('path');
const pug = require('pug');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

// root url
app.get('/', (req, res) => {
    res.render('test', { 'name': 'This is test for pug' });
});

app.listen(3000, () => {

    // https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-react-app-with-nodejs-bc06fa1c18f3
    // https://pugjs.org/api/getting-started.html

    // display view path
    console.log(path.join(__dirname, "views\\test.pug"));

    // Compile the source code
    const compiledFunction = pug.compileFile(path.join(__dirname, "views\\test.pug"));

    // Render a set of data
    console.log(compiledFunction({ name: 'Timothy' }));
    // "<p>Timothy's Pug source code!</p>"

    // Render another set of data
    console.log(compiledFunction({ name: 'Forbes' }));
    // "<p>Forbes's Pug source code!</p>"  

    // Compile template.pug, and render a set of data
    console.log(pug.renderFile(path.join(__dirname, "views\\test.pug"), { name: 'Timothy' }));
    // "<p>Timothy's Pug source code!</p>"    

    console.log('Listening on port 3000');
});