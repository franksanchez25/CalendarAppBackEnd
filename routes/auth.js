/*
    Auth route
    api/auth

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser,userLogin, renewToken } = require('../controllers/auth')
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');


const router = Router();



router.post(
    '/new',
    [
        check('name','Name field is required').not().isEmpty(),
        check('email','Enter valid email').isEmail(),
        check('password','Password should be at least 6 characters').isLength({min:6}),
        fieldValidator
    ],
 createUser
 );

router.post(
    '/',
    [
        check('email','Enter Valid Email').isEmail(),
        check('password','Password should be at least 6 characters').isLength({min:6}),
        fieldValidator
    ],
     userLogin
     );


    router.get('/renew',
        jwtValidator, 
        renewToken
    );

module.exports = router;