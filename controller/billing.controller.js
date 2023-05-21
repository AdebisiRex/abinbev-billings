const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const billingsModel = require("../model/billing.model");
const orderModel = require("../model/order.model")

const makePayment = (req, res) => {
  const token = req.headers.authorization;
  // res.send({message: "shall we?"})
  jwt.verify(token, SECRET, (err, result) => {
    if (err) {
      res.status(403).send({
        status: false,
        message: "Please sign in to make payment",
        err: err.message,
      });
    } else {
      const { order_id, amount_paid } = req.body;
      orderModel.findOne({ _id: order_id }).then((result) => {
        let new_paid = Number(amount_paid) + Number(result.amount_paid);
        orderModel
          .findOneAndUpdate({ _id: order_id }, { amount_paid: new_paid})
          .then((result) => {
            let form = new billingsModel(req.body);
            form.save().then((result) => {
              setTimeout(() => {
                res.status(200).send({
                  message: "Payment Successful",
                  status: true,
                });
              }, 5000);
            });
          });
      });
    }
  });
};

module.exports = { makePayment };
