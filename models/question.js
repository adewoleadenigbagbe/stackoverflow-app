'use strict';

const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content_body: {
        type: String,
        required: true
    },
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    },
    answers: [{
        content_body: {
            type: String,
            required: true
        },
        date_created: {
            type: Number,
            required: true,
            default: Date.now()
        },
        date_updated: {
            type: Number,
            required: true,
            default: Date.now()
        },
        upvote: {
            type: Number,
            default: 0
        },
        downvote: {
            type: Number,
            default: 0
        },
        answerer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        comments: [{
            commenter: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'user'
            },
            date_created: {
                type: Date,
                required: true
            },
            rating: {
                type: Number,
                required: true,
                default: 0
            },
        }],
    }],
    tags: {
        type: [String],
        required: true
    },
    date_created: {
        type: Number,
        default: Date.now(),
        required: true
    },
    date_updated: {
        type: Number,
        default: Date.now(),
        required: true
    },
    comments: [{
        commenter: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        date_created: {
            type: Date,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        },
    }],
    numberofviews: {
        type: Number,
        default: 0
    },
    asker: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
        required: true
    }
});

module.exports = mongoose.model("question", questionSchema);