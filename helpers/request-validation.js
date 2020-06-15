'use strict';

const { body, } = require('express-validator');
const { verify } = require('jsonwebtoken');

//validate the request and return 
function validateQuestion() {
    return [
        body('title')
            .notEmpty()
            .trim()
            .escape()
            .withMessage("Title must not empty"),
        body('content_body')
            .notEmpty()
            .withMessage("content must not empty"),
        body('tags')
            .isArray({ min: 1 })
            .withMessage("Question tags must not empty"),
        body('askerId')
            .notEmpty()
            .isMongoId()
            .withMessage("asker id must not be empty and be valid ID")

    ]
}

function validateAnswer() {
    return [
        body('answer.content_body')
            .notEmpty()
            .withMessage("content body must not empty"),
        body('answer.answerer')
            .notEmpty()
            .isMongoId()
            .withMessage("Answerer body must not empty and be valid ID"),
        body('questionId')
            .notEmpty()
            .isMongoId()
            .withMessage("questionId must not be empty and valid")
    ]
}

function validateSignUp() {
    return [
        body('username')
            .notEmpty()
            .trim()
            .escape()
            .withMessage("Username must not be empty"),
        body('password')
            .notEmpty()
            .trim()
            .escape()
            .isLength({ min: 5 })
            .withMessage("Password must not be empty and Length should be >= 5"),
        body('email')
            .notEmpty()
            .trim()
            .isEmail()
            .withMessage("Email must not be empty and be Valid")
    ]
}

function validateSignIn() {
    return [
        body('email')
            .notEmpty()
            .trim()
            .isEmail()
            .withMessage("Email must not be empty and valid")
    ]
}

function validateVote() {
    return [
        body('questionId')
            .notEmpty()
            .isMongoId()
            .withMessage("questionId must not be empty and valid")
    ]
}
function validateSubscription() {
    return [
        body('questionId')
            .notEmpty()
            .isMongoId()
            .withMessage("questionId must not be empty and valid"),
        body('subscriptionId')
            .notEmpty()
            .isMongoId()
            .withMessage("subscriptionId must not be empty and valid")
    ]
}

function authourizeResource(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === undefined)
        return res.status(401).send({ user: null, message: "provide a token in the header" });

    verify(token, "heimxydall", async (err, dec) => {
        if (err) {
            return res.status(403).send({ user: null, message: err.message });
        } else {
            res.locals.decoded = dec;
            next();
        }
    })
}







module.exports = { validateQuestion, validateAnswer, validateSignUp, validateVote, validateSignIn, authourizeResource, validateSubscription }