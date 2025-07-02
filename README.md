# 💵 Chapa Payment Integration – Node.js

[![Node.js](https://img.shields.io/badge/node.js-v22.17.0-brightgreen?logo=node.js&style=flat-square)](https://nodejs.org/)
[![License](https://img.shields.io/github/license/Awizardware/chapa-integration?style=flat-square)](https://github.com/Awizardware/chapa-integration/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/Awizardware/chapa-integration?style=flat-square)](https://github.com/Awizardware/chapa-integration/commits/main)

This is a simple Node.js application integrating Chapa’s payment API using Express and Axios.

---

## 🔧 Features

- POST `/pay` – Initialize payment
- GET `/verify/:tx_ref` – Verify transaction

---

## 📦 Dependencies

- Node.js (v18+)
- Express
- Axios
- Dotenv

---

## 🔐 Environment Setup

Create a `.env` file with:

```env
CHAPA_SECRET_KEY=CHASECK_TEST-xxxxxxxxxxxxxx

## 📄 License

MIT — Feel free to use and modify!