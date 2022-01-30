// blockchain.route.js

const express=require('express');
const cookieparser=require('cookie-parser');
const bodyparser=require('body-parser');
const session=require('express-session');
const { body, validationResult } = require('express-validator');
const uuid = require('uuid');
const uniqid = require('uniqid');
const router = express.Router();

// session.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

router.get('/', function (req, res) {

    console.log(uniqid());
    console.log(uniqid('hello-'));
    console.log(uniqid('hello-', '-goodbye'));

    if (req.session.success) {
        console.log(req.session.success);
    }
    else{
        console.log('req.session.success - not found');
    }

    console.log(((typeof req.session.errors !== "undefined") ? req.session.errors : null));
    console.log(JSON.stringify(req.cookies["connect.sid"]) + "<br>" + JSON.stringify(req.sessionID) + "<br>" + JSON.stringify(req.session.count));

    res.render('blockchain', {
        success: ((typeof req.session.success !== "undefined") ? req.session.success : false),
        errors: ((typeof req.session.errors !== "undefined") ? req.session.errors : null)
    });
});

router.post('/post', [
    body('name').notEmpty(),
    body('bandwidth').notEmpty()
], function (req, res) {

    const errors = validationResult(req);

    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/blockchain?id=1');
    }
    else {

        let name = req.body.name;
        let bandwidth = req.body.bandwidth;

        req.session.success = true;
        res.redirect('/?id=1');
    }
});

module.exports = router;