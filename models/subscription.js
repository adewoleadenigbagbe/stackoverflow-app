'use strict';

const mongoose = require('mongoose');
const subscriptionSchema = mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: 'question'
    },
    subscribers: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model("subscription", subscriptionSchema);