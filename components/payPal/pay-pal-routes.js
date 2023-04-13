const express = require('express'),
  router = express.Router(),
  payPalCtrls = require('./pay-pal-ctrls');
  
router
  .get("/:idUser", payPalCtrls.getPaymentForm)
  .post("/api/orders", payPalCtrls.createOrder)
  .post("/api/orders/:orderID/capture", payPalCtrls.capturePayment);

module.exports = router;
