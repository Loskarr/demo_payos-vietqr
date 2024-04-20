const express = require('express');
const PayOS = require('@payos/node');


const payos = new PayOS(
    'a83ec361-2ea7-42ae-87b5-1b0a7b55ddcd',
    '31407aec-5541-407c-997c-535ab7a1b7e4',
    '6bea568a76d274b204e7e661f1198f2261741c368416829b71c2f178ef140a9e');
const app = express();

app.use(express.static('public'));
app.use(express.json());


app.post('/create-payment-link', async (req, res) => {
    const order = {
        amount: 1000,
        description :'Thanh toan mi tom',
        orderCode: Math.floor(Math.random() * 9007199254740990) + 1,
        returnUrl: `https://drive.google.com/file/d/1DaoW9CH7ri29mHZ5Qtxl6uMo-wH3X4ol/view`,
        //cancelUrl: `https://demo-casso-g36v549e8-loskarrs-projects.vercel.app/cancel.html`
        cancelUrl: `https://drive.google.com/file/d/1DaoW9CH7ri29mHZ5Qtxl6uMo-wH3X4ol/view`
    }
    const paymentLink = await payos.createPaymentLink(order);
    res.redirect(303, paymentLink.checkoutUrl);
})

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})