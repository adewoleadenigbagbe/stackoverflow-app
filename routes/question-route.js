'use strict';

const express = require('express');
const QuestionController = require('../controllers/QuestionController');


const questionController = new QuestionController();
const router = express.Router();
const { validateAnswer, validateQuestion, authourizeResource, validateVote } = require('../helpers/request-validation');



router.post('/ask', authourizeResource, validateQuestion(), questionController.askQuestion);
router.put('/answer', authourizeResource, validateAnswer(), questionController.answer);
router.put('/upvote', authourizeResource, validateVote(), questionController.upvote);
router.put('/downvote', authourizeResource, validateVote(), questionController.downvote);
router.get('/all', questionController.all);
router.get('/', questionController.search);

module.exports = router;
