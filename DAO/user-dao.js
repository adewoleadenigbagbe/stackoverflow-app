'use strict';
const User = require('../models/user');

//create new user
async function createUser(user) {
    try {
        let newUser = new User({
            username: user.username,
            email: user.email,
            password: user.password
        });
        let docResult = await newUser.save();
        return docResult;
    }
    catch (err) {
        throw err;
    }
}

//get user information by Email
async function getUserbyEmail(email) {
    try {
        let user = await User.findOne({ 'email': email }, 'email');
        return user;
    }
    catch (err) {
        throw err;
    }
}

//get user information by ID
async function getUserbyId(id) {
    try {
        let user = await User.findById(id);
        return user;
    }
    catch (err) {
        throw err;
    }
}

//searc User
async function searchUser(name) {
    try {
        let result = await User.find({ 'username': name }, 'email username').exec();
        return result
    }
    catch (err) {
        throw err;
    }
}

module.exports = { createUser, getUserbyEmail, getUserbyId, searchUser };