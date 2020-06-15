'use strict';

const Question = require('../models/question');


//create new Question
async function createQuestion(question) {
    try {
        let newQuestion = new Question({
            title: question.title,
            content_body: question.content_body,
            tags: question.tags,
            asker: question.asker
        });
        let result = await newQuestion.save();
        return result;
    }
    catch (err) {
        throw err;
    }
}

//create new answer
function appendAnswer(questionId, answer) {
    Question.findByIdAndUpdate(
        { _id: questionId },
        { $push: { answers: answer } },
        (err, doc) => {
            if (err) {
                throw err;
            }
            return doc;
        });
}

//upvote a question
function upvoteQuestion(questionId) {
    Question.findByIdAndUpdate({ _id: questionId }, { $inc: { upvote: 1 } }, (err, doc) => {
        if (err) {
            throw err;
        }
        return doc;
    });
}

//upvote a question
function downvoteQuestion(questionId) {
    Question.findByIdAndUpdate({ _id: questionId }, { $inc: { downvote: 1 } }, (err, doc) => {
        if (err) {
            throw err;
        }
        return doc;
    });
}

//Get all Question
async function getAllQuestions() {
    try {
        let result = await Question.find().exec();
        return result;
    }
    catch (err) {
        throw err;
    }
}

//Search for a question
async function searchQuestion(tags) {
    let docResults = await Question.find({ 'tags': { '$in': tags } }).exec();
    return docResults;
}





module.exports = { createQuestion, appendAnswer, upvoteQuestion, downvoteQuestion, getAllQuestions, searchQuestion };