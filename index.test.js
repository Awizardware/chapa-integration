require('dotenv').config();
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const CHAPA_SECRET = process.env.CHAPA_SECRET_KEY;
const CHAPA_BASE = "https://api.chapa.co/v1";

app.use(express.json());

// Root route - simple welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Chapa Integration Server! Use /pay or /verify/:tx_ref endpoints.');
});

// 🔸 Create Payment Endpoint
app.post("/pay", async (req, res) => {
    const tx_ref = `txn-${Date.now()}`;
    const payload = {
        amount: "100",
        currency: "ETB",
        email: "yonatesfaye123@gmail.com",
        first_name: "Yonathan",
        last_name: "Tesfa",
        phone_number: "+251901235385",
        tx_ref,
        callback_url: "https://webhook.site/test",  // Replace later if needed
        return_url: "https://example.com/thank-you"
    };

    try {
        const response = await axios.post(`${CHAPA_BASE}/transaction/initialize`, payload, {
            headers: { 
              Authorization: `Bearer ${CHAPA_SECRET}`,
              'Content-Type': 'application/json'
            }
        });
        res.json({
            checkout_url: response.data.data.checkout_url,
            tx_ref
        });
    } catch (err) {
        res.status(400).json({ error: err.response?.data || err.message });
    }
});

// 🔸 Verify Payment Endpoint
app.get("/verify/:tx_ref", async (req, res) => {
    try {
        const response = await axios.get(`${CHAPA_BASE}/transaction/verify/${req.params.tx_ref}`, {
            headers: { 
              Authorization: `Bearer ${CHAPA_SECRET}`,
              'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.response?.data || err.message });
    }
});

// 🔸 Webhook Endpoint
app.post('/webhook', (req, res) => {
  const event = req.body;
  
  console.log('Webhook received:', event);

  // Save event data to a JSON file (append)
  const filePath = path.join(__dirname, 'webhook-events.log');
  const logEntry = `${new Date().toISOString()} - ${JSON.stringify(event)}\n`;

  fs.appendFile(filePath, logEntry, (err) => {
    if (err) {
      console.error('Error saving webhook event:', err);
    } else {
      console.log('Webhook event saved to webhook-events.log');
    }
  });

  // Respond quickly
  res.status(200).send('Webhook received');
});

const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

// Export app and server for tests
module.exports = { app, server };