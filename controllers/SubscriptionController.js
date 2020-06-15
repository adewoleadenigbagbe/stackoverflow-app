'use strict';
const { subscribe } = require('../DAO/subscription-dao');
const { validationResult } = require('express-validator');



class SubscriptionController {
    async subscribeUser(req, res) {
        //validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ validationErrors: errors });
        }

        try {
            let subscription = {
                questionId: req.body.questionId,
                subscriptionId: req.body.subscriptionId
            };

            //subscribe user
            subscribe(subscription);
            return res.status(201).send({ message: "Subscription Succesful" });
        }
        catch (err) {
            return res.status(200).send({ message: err.message });
        }
    }
}

module.exports = SubscriptionController;