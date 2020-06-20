const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()


const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req,res) => {
    res.send("it works")
})

app.post("/payment", (req, res) => {
    const {product, token} = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);
    const idempotency_Key = uuid() //COMEBACK

    return stripe.customers.create({
        email: token.email,
        sourse: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of product.name`,
            shipping: {
                name: token.card.name,
                address: {
                    countery: token.card.address_country
                }
            }
        }, {idempotency_Key})
    }).then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

// listen
app.listen(8282, () => console.log(`It is listening at Port 8282`));
