var express = require('express');
const { body, validationResult } = require('express-validator');
const axios = require('axios').default;
var csrf = require('csurf');
// setup route middlewares
var csrfProtection = csrf();
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET home page. */
router.get('/sign-up', csrfProtection, function(req, res, next) {
  res.render('sign-up', { 
    title: 'Express', 
    csrfToken: req.csrfToken()
  });
});

/* POST validate contact form */
router.post(
  '/sign-up',
  [
    body('fullname')
      .trim()
      .not().isEmpty()
      .escape()
      .isLength({ min: 5 })
      .withMessage('*Fullname must be at least 5 chars long'),
    body('email')
      .trim()  
      .not().isEmpty()
      .escape()
      .isEmail()
      .normalizeEmail()
      .withMessage('*Email must be right format'),
    body('password')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,"i")
      .withMessage('*Password should be combination of one uppercase , one lower case, one digit and min 8'),
    body('mobile')
      .trim()
      .optional({ checkFalsy: true })
      .escape()
      .matches(/^[0-9]{10}$/)
      .withMessage('*Please put 10 digit mobile number')
  ], function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.json({ 
        errors,
        msg: 'validation'
       });
    }
    else{
      let username = req.body.fullname;
      let email = req.body.email;
      let password = req.body.password;
      let phone = req.body.mobile;
      let day = req.body.day;
      let month = req.body.month;
      let year = req.body.year;
      let gender = req.body.gender;
      axios.post(`${process.env.API_URL}/auth/local/register`, {
        username,
        email,
        password: String(password),
        phone,
        day,
        month,
        year,
        gender
      })
      .then(response => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        return res.json({ 
          msg: 'success', 
          data: response.data
        });
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
    }
  });

/* GET home page. */
router.get('/sign-in', csrfProtection, function(req, res, next) {
  res.render('sign-in', { 
    title: 'Express',
    csrfToken: req.csrfToken()
  });
});

/* POST Sign-in. */
router.post(
  '/sign-in',
  [
    body('email')
      .trim()  
      .not().isEmpty()
      .escape()
      .isEmail()
      .normalizeEmail()
      .withMessage('*Email must be right format'),
  ], function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.json({ 
        errors,
        msg: 'validation'
       });
    }
    else{
      let email = req.body.email;
      let password = req.body.password;
      axios.post(`${process.env.API_URL}/auth/local`, {
        identifier: email,
        password: String(password),
      })
      .then(response => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        return res.json({ 
          msg: 'success', 
          data: response.data
        });
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
    }
});

/* GET home page. */
router.get('/reset-password', csrfProtection, function(req, res, next) {
  res.render('reset-password', { 
    title: 'Express',
    csrfToken: req.csrfToken()
  });
});

/* POST Sign-in. */
router.post(
  '/forgot-password',
  [
    body('email')
      .trim()  
      .not().isEmpty()
      .escape()
      .isEmail()
      .normalizeEmail()
      .withMessage('*Email must be right format'),
  ], function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.json({ 
        errors,
        msg: 'validation'
       });
    }
    else{
      let email = req.body.email;
      
      axios.post(`${process.env.API_URL}/auth/forgot-password`, {
        email: String(email),
      })
      .then(() => {
        // Handle success.
        console.log('Your user received an email');
        return res.json({ 
          msg: 'success', 
        });
      })
      .catch(error => {
        // Handle error.
        // console.log('An error occurred:', error.response);
        console.log('An error occurred!!!');
      });
    }
});

/* GET home page. */
router.get('/change-password', csrfProtection, function(req, res, next) {
  res.render('change-password', { 
    title: 'Express',
    csrfToken: req.csrfToken()
  });
});

module.exports = router;
