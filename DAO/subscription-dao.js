'use strict';

const Subscription = require('../models/subscription');


//subscribe user
async function subscribe(obj) {
    //check if the question exist findById
    let searchResult = await Subscription.findOne({ questionId: obj.questionId });

    //check if the question exist ,add new subscription ,else update
    if (searchResult === null) {
        let newSubscription = new Subscription({
            questionId: obj.questionId,
            subscribers: [obj.subscriptionId]
        });

        await newSubscription.save();
    } else {
        Subscription.findOneAndUpdate({ questionId: obj.questionId },
            { $push: { subscribers: obj.subscriptionId } },
            (err) => {
                if (err) {
                    throw err;
                }
            }
        )
    }
}
module.exports = { subscribe };