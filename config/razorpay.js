const Razorpay = require("razorpay");



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_PASSKEY,
});

module.exports = razorpay;
