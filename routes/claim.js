const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');

router.post('/:userId', claimController.claimPoints);

module.exports = router;