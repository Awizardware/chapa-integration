require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const CHAPA_SECRET = process.env.CHAPA_SECRET_KEY;
const CHAPA_BASE = "https://api.chapa.co/v1";

app.use(express.json());

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
            headers: { Authorization: `Bearer ${CHAPA_SECRET}` }
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
            headers: { Authorization: `Bearer ${CHAPA_SECRET}` }
        });
        res.json(response.data);
    } catch (err) {
        res.status(400).json({ error: err.response?.data || err.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
