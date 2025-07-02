require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const CHAPA_SECRET = process.env.CHAPA_SECRET_KEY;
const CHAPA_BASE = "https://api.chapa.co/v1";

// ✅ Serve static files from /assets directory
app.use('/assets', express.static('assets'));

app.use(express.json());

// 🔸 Root route with enlarged logo
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chapa Payment Integration</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                }
            </style>
        </head>
        <body class="bg-gray-100">
            <div class="min-h-screen flex items-center justify-center p-4">
                <div class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <!-- Logo and Header -->
                    <div class="text-center mb-8">
                        <img src="/assets/logo1.png" alt="Logo" class="w-35 h- 35 mx-auto mb-6 rounded-full shadow-md border-4 border-white bg-white object-contain" />
                        <h1 class="text-3xl font-bold text-gray-900">Chapa Payment Integration</h1>
                        <p class="text-green-600 font-semibold mt-2 text-lg">✅ Backend is Running</p>
                    </div>

                    <!-- API Endpoints Section -->
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center md:text-left">API Endpoints</h2>
                        <div class="space-y-4">
                            <!-- POST /pay -->
                            <div>
                                <p class="text-sm text-gray-600 mb-1">Initialize a payment:</p>
                                <div class="flex items-center bg-gray-200 rounded-md p-3">
                                    <span class="text-sm font-bold text-purple-600 bg-purple-100 border border-purple-200 px-2 py-1 rounded-md">POST</span>
                                    <code class="ml-4 text-gray-800 font-mono text-sm">/pay</code>
                                </div>
                            </div>
                            <!-- GET /verify/:tx_ref -->
                            <div>
                                <p class="text-sm text-gray-600 mb-1">Verify a transaction:</p>
                                <div class="flex items-center bg-gray-200 rounded-md p-3">
                                    <span class="text-sm font-bold text-blue-600 bg-blue-100 border border-blue-200 px-2 py-1 rounded-md">GET</span>
                                    <code class="ml-4 text-gray-800 font-mono text-sm">/verify/:tx_ref</code>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Footer -->
                    <p class="text-center text-xs text-gray-400 mt-8">Powered by Express & Chapa</p>
                </div>
            </div>
        </body>
        </html>
    `);
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
        callback_url: "https://webhook.site/test",
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
        console.error("Payment initialization error:", err.response?.data || err.message);
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
        console.error("Payment verification error:", err.response?.data || err.message);
        res.status(400).json({ error: err.response?.data || err.message });
    }
});

const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = { app, server };