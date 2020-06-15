'use strict';

const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const config = require('config');


const { salt_round } = config.get('crypto_info');
const { secret, expiresIn } = config.get('web_token_info');
const { createUser, getUserbyEmail, getUserbyId, searchUser } = require('../DAO/user-dao');
const { validationResult } = require('express-validator');

class UserController {
    async signUp(req, res) {

        //validate result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ validationErrors: errors });
        }
        //get the user email
        let userDetails = await getUserbyEmail(req.body.email);

        if (userDetails instanceof Error) {
            return res.status(200).send({ auth: false, token: null, message: "Error retreiving email. Try again later" });
        }

        //check if userDetails exist
        if (userDetails !== null) {
            return res.status(200).send({ auth: false, token: null, message: "Provided Email already used" });
        }

        //hash password provided
        let hashedPassword = bcrypt.hashSync(req.body.password, salt_round);

        let newUser = {
            "username": req.body.username,
            "email": req.body.email,
            "password": hashedPassword,
        };

        //save new user
        let savedDoc = {}
        try {
            savedDoc = await createUser(newUser);
        }
        catch (err) {
            console.log(err);
        }
        if (savedDoc instanceof Error) {
            return res.status(200).send({ auth: false, token: null, message: "Error saving. Try again later" });
        }

        //Sign the token
        let token = sign({ id: savedDoc._id }, secret, { expiresIn: expiresIn });
        return res.status(201).send({ auth: true, token: token, message: "Sign up Successful" });

    }
    async signIn(req, res) {

        //validate the result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ validationErrors: errors });
        }

        //get the User Information
        const decodedUser = await getUserbyId(res.locals.decoded.id);
        if (decodedUser === null) {
            return res.status(200).send({ user: null, message: "No User Information. Please do sign up" });
        }
        if(decodedUser.email !== req.body.email){
            return res.status(401).send({ user: null, message: "User Info not found" });
        }
        return res.status(200).send({ user: { email: decodedUser.email, username: decodedUser.username }, message: "User Info Retrieved" });

    }
    async search(req, res) {
        //check if the search key is provided and not empty
        if (typeof req.query.username === 'undefined' || req.query.username.length === 0) {
            return res.status(400).send({ message: "Supply search key" })
        }

        //search user
        try {
            let searchResult = await searchUser(req.query.username);
            if(searchResult === null){
                return res.status(200).send({ message: "Users Information retrived successfully", user: null })
            }
            return res.status(200).send({ message: "Users Information retrived successfully", user: searchResult })
        }
        catch (err) {
            console.log(err);
            return res.status(200).send({ message: err.message, user: null });

        }

    }
}

module.exports = UserController;