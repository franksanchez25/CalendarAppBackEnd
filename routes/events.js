/*
Auth route
    api/auth

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { jwtValidator } = require('../middlewares/jwt-validator')
const { fieldValidator } = require('../middlewares/field-validator');
const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');

const router = Router();

router.use(jwtValidator);


router.get('/', getEvents);

router.post('/',[
    check('title', 'title is required').not().isEmpty(),
    check('startDate', 'Enter valid date').isDate(),
    check('endDate', 'Enter valid date').isDate(),
    fieldValidator
], createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);


module.exports = router