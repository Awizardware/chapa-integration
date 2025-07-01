# Chapa Payment Integration – Node.js

This project is a simple Chapa payment integration built with Node.js and Express.

## 🔧 Features

- POST `/pay` – Initialize payment
- GET `/verify/:tx_ref` – Verify transaction status

## 📦 Dependencies

- Express
- Axios
- Dotenv

## 🔐 Environment Setup

Create a `.env` file with your Chapa Secret Key:

CHAPA_SECRET_KEY=CHASECK_TEST-xxxxxxxxxxxxxxxx


## 🚀 How to Run

1. Clone or extract the folder
2. Install packages:
3. Run the server:


4. Test endpoints using Postman:
- `POST http://localhost:3000/pay`
- `GET http://localhost:3000/verify/:tx_ref`

## ✅ Sample Response

### `/pay`
```json
{
"checkout_url": "https://checkout.chapa.co/checkout/payment/xyz...",
"tx_ref": "txn-123456789"
}
{
  "status": "success",
  "data": {
    "status": "success",
    "amount": 100,
    "email": "example@gmail.com",
    ...
  }
}


🧑‍💻 Built by:
Yonathan Tesfaye
Email: yonatesfaye123@gmail.com
Date: July 2025
