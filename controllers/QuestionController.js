'use strict';

const express = require('express');

const { createQuestion, appendAnswer, upvoteQuestion, downvoteQuestion, getAllQuestions, searchQuestion } = require('../DAO/question-dao');
const { validationResult } = require('express-validator');


class QuestionController {
    async askQuestion(req, res) {

        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ validationErrors: errors });
        }

        let question = {
            title: req.body.title,
            content_body: req.body.content_body,
            tags: req.body.tags,
            asker: req.body.askerId
        };

        //create question
        try {
            let questionResult = await createQuestion(question);
            if (questionResult) {
                return res.status(201).send({ questionId: questionResult._id, message: "Question successfully saved" })
            }
        }
        catch (err) {
            console.log("Error Saving Question : ", err);
            return res.status(200).send({ questionId: null, message: err.message })
        }
    }
    async answer(req, res) {

        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ validationErrors: errors });
        }

        //Add answer
        try {
            let result = appendAnswer(req.body.questionId, req.body.answer);
            if (result === null) {
                return res.status(200).send({ message: "Question to add answer to not found" });
            }
            return res.status(200).send({ message: "Answer Added Successfully" });
        }
        catch (err) {
            console.log("Failed to Add Answer ", err);
            return res.status(200).send({ message: err.message })
        }
    }
    async upvote(req, res) {
        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ validationErrors: errors });
        }

        //increment the upvote
        try {
            let result = await upvoteQuestion(req.body.questionId);
            if (result === null) {
                return res.status(200).send({ message: "Question to be upvoted not found" });
            }
            return res.status(200).send({ message: "Question upvoted successfully" });
        }
        catch (err) {
            console.log("Failed to upvote Question ", err);
            return res.status(200).send({ message: err.message })
        }
    }
    async downvote(req, res) {

        //validate result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ validationErrors: errors });
        }

        //increment the downvote
        try {
            let result = await downvoteQuestion(req.body.questionId);
            if (result === null) {
                return res.status(200).send({ message: "Question to be downvoted not found" });
            }
            return res.status(200).send({ message: "Question downvoted successfully" });
        }
        catch (err) {
            console.log("Failed to downvote Question ", err);
            return res.status(200).send({ message: err.message })
        }
    }
    async all(req, res) {
        //retrieve questions
        try {
            let questions = await getAllQuestions();
            if (questions.length === 0) {
                return res.status(200).send({ message: "No question found", questions: [] });
            }
            return res.status(200).send({ message: "Successful", questions: questions });
        }
        catch (err) {
            console.log(err);
            return res.status(200).send({ message: err.message });
        }
    }
    async search(req, res) {
        //check if tags fields is supplied and not empty
        if (typeof req.query.tags === 'undefined' || req.query.tags.length === 0) {
            console.log(req.query.tags)
            return res.status(200).send({ message: "Tags for search not specified." });
        }

        //split the tags to an array
        let tags = req.query.tags.split(',');
        try {
            // retrieve questions
            let searchResult = await searchQuestion(tags);
            if (searchResult.length > 0) {
                return res.status(200).send({ message: "Search Result Successful", questions: searchResult });
            }
            return res.status(200).send({ message: "No search result", questions: [] });
        }
        catch (err) {
            return res.status(200).send({ message: err.message, questions: [] });
        }
    }
}

module.exports = QuestionController;
