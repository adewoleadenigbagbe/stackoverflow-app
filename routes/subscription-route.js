'use strict';

const express = require('express');
const router = express.Router();

const SubscriptionController = require('../controllers/SubscriptionController');
const subscriptionController = new SubscriptionController();

const { validateSubscription, authourizeResource } = require('../helpers/request-validation');


router.post('/', authourizeResource, validateSubscription(), subscriptionController.subscribeUser);

module.exports = router;


