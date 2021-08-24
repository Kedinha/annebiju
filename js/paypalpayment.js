

var express = require('express');
var request = require('request');

express()
    .post('/my-server/create-order', function(req, res) {
        request.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
            headers: {
                Content-Type: "application/json",
                Authorization: "Bearer <Access-Token>",
                PayPal-Partner-Attribution-Id: "8G86Y4G86ZFSE"
            },
            body: {
                "intent": "CAPTURE",
                "purchase_units": [{
                    "amount": {
                        "currency_code": "USD",
                        "value": "100.00"
                    },
                    "payee": {
                        "email_address": "seller@example.com"
                    },
                    "payment_instruction": {
                        "disbursement_mode": "INSTANT",
                        "platform_fees": [{
                            "amount": {
                                "currency_code": "USD",
                                "value": "25.00"
                            }
                        }]
                    }
                }],
            },
            json: true
        }, function (err, response, body) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            res.json({
                id: body.id
            });
        });
    });