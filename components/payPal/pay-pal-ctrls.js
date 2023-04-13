const fetch = require('node-fetch');
// set some important variables
//sandbox cred
/*const base = "https://api-m.sandbox.paypal.com",
  CLIENT_ID = '',
  APP_SECRET ='';*/
const base = "https://api-m.paypal.com",
  CLIENT_ID = '',
  APP_SECRET = '';

exports.getPaymentForm = async (req, res) => {
  let izProd = '';
  if(process.env.NODE_ENV === "production") {
    izProd = true;
  } else {
    izProd = false
  }
  console.log('IN GET /');
    const clientId = CLIENT_ID,
      idUser = req.params.idUser;
    console.log('CLIENT ID :', clientId);
    try {
      const clientToken = await generateClientToken();
      res.render("checkout", { clientId, clientToken, idUser , izProd});
    } catch (err) {
      res.status(500).send(err.message);
    }
}
exports.createOrder = async (req, res) => {
  try {
    const order = await createOrder();
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
exports.capturePayment = async (req, res) => {
  const { orderID } = req.params;
  try {
    const captureData = await capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// call the create order method
async function createOrder () {
  const purchaseAmount = "5.00"; // TODO: pull prices from a database
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: purchaseAmount,
          },
        },
      ],
    }),
  });

  return handleResponse(response);
}
// capture payment for an order
async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}
// generate access token
async function generateAccessToken(){
  console.log('IN generate Access');
  const auth = Buffer.from(`${CLIENT_ID}:${APP_SECRET}`).toString("base64");
  console.log('AUTH :', auth);
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}
// generate client token
async function generateClientToken(){
  const accessToken = await generateAccessToken();
  const response = await fetch(`${base}/v1/identity/generate-token`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Accept-Language": "en_US",
      "Content-Type": "application/json",
    },
  });
  const jsonData = await handleResponse(response);
  return jsonData.client_token;
}
async function handleResponse(response){
  console.log('in HANDLE resp')
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }
  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
