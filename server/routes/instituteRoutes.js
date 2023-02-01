const express = require('express');
const instController = require('./../controllers/instituteController');

const router = express.Router();

router
    .get('/', instController.getAllInstitutes)
    .post('/', instController.createInstitute)
    .get('/:id', instController.getInstitute)
    .patch('/:id', instController.updateInstitute)
    .delete('/:id', instController.deleteInstitute);

module.exports = router;