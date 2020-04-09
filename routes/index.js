const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const path = require('path');
const auth = require('http-auth')

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
})

const {check, validationResult} = require('express-validator');
const Registration = mongoose.model('Registration')


router.get('/', (req, res) => {
    res.render('form', {'title': 'Registration Form'});
});

router.post('/', [
    check('name').isLength({min: 1}).withMessage('Please Enter Name'),
    check('email').isLength({min: 1}).withMessage('Please Enter Email')
], (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const registration = new Registration(req.body);
        registration.save()
            .then(() => {res.send('Thank You for Registration')})
            .catch((err) => {
                console.log(err);
                res.send("Sorry Something Went Wrong");
            });
    } else {
        res.render('form', {
            title: 'Registration Form',
            errors: errors.array(),
            data: req.data
        });
    }
});

router.get('/registrations', basic.check((req, res) => {
    Registration.find()
        .then((registrations) => {
            res.render('index', {'title': 'Listing Registration', 'registrations': registrations});
        })
        .catch((err) => {
            console.log(err);
            res.send("Sorry Something went wrong");
        })    
}));

router.get('/registrations/:id', basic.check((req, res) => {
    Registration.findById(req.params.id)
        .then((registration) => {
            res.render('detail', {'title': 'Listing Registration', 'registration': registration});
        })
        .catch((err) => {
            console.log(err);
            res.send("Sorry Something went wrong");
        })    
}));


module.exports = router;