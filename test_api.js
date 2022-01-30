
// 
// https://appdividend.com/2018/02/06/express-form-validation-tutorial/
// https://morioh.com/p/958925559f2b
// https://express-validator.github.io/docs/
// https://express-validator.github.io/docs/index.html
// 
const express = require('express');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('express-hbs');
const path = require('path');
const uuid = require('uuid');

var fetch = require('node-fetch');
var redis = require('redis'); 


const blockchain = require('./routes/blockchain.route');
const apiRoutes = require('./src/routes/api.routes');

// Setup express server port and redis client port
const port = process.env.PORT || 3000; 
const REDIS_PORT = process.env.REDIS_PORT || 6379; // 

// create redis client on redis port
// const redisClient = redis.createClient(REDIS_PORT);

// create express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'krunal',
    saveUninitialized: false,
    resave: false,
    genid: function (req) {
        return uuid.v1(); // Generate a v1 (time-based) id
    },
    maxAge: 10000
}));

// set public path
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/blockchain', blockchain);
// using as middleware
app.use('/api/v1', apiRoutes);

// view confirmation
app.engine('hbs', hbs.express4({ partialsDir: __dirname + '/views/partials' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// define a root route
// https://flaviocopes.com/express-validate-input/
// https://express-validator.github.io/docs/custom-error-messages.html
app.post('/', [
    check('programming_language').isIn(['javascript', 'java', 'php']),
    check('design_tools').isIn(['canva', 'photoshop', 'gimp']),
    check('name').isAlpha().withMessage('Must be only alphabetical chars')
        .isLength({ min: 10 }).withMessage('Must be at least 10 chars long'),
    check('password', 'The password must be 5+ chars long and contain a number')
        .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
        .matches(/\d/).withMessage('must contain a number')
        .not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password')
        .custom((value, { req }) => {
            if (value !== req.body.passwordConfirmation) {
                throw new Error('Password and confirm confirmation must be same');
            }
            return true;
        }),
    check('email').custom(email => {
        // if (alreadyHaveEmail(email)) {
        if (email == "tahmilur@yahoo.com") {
            return Promise.reject('Email already registered'); // or // throw new Error('Email already registered' + email);
        };
        return true;
    }),
    check('age').isNumeric()
], (req, res) => {
    /*
        req.body, req.cookies, req.headers, req.params, req.query    
    */
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;

    res.send("Hello World ! Welcome to API test. all are valid. name: " + name + " email: " + email + " age:" + age);
});
// define a root route
app.get('/', (req, res) => {
    res.send("Hello World ! Welcome to API post test");
});

app.get('/checkcs', (req, res, next) => {
    if (!req.session.count) {
        req.session.count = 1;
    }
    else {
        req.session.count += 1;
    }

    res.send(JSON.stringify(req.cookies["connect.sid"]) + "<br>" + JSON.stringify(req.sessionID) + "<br>" + JSON.stringify(req.session.count));
});

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port http://127.0.0.1:${port}/`);
});
