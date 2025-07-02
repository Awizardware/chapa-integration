require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Use cors middleware to allow cross-origin requests from your HTML file

// This endpoint will handle the POST request from your frontend
app.post('/pay', async (req, res) => {
    const { first_name, last_name, email, phone_number, amount } = req.body;

    // Generate a unique transaction reference
    const tx_ref = `chapa-payment-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
        const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', {
            amount: amount,
            currency: "ETB",
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            tx_ref: tx_ref,
            callback_url: process.env.CHAPA_CALLBACK_URL || "https://webhook.site/test", // Use a real callback URL in production
            return_url: process.env.CHAPA_RETURN_URL || "https://example.com/thank-you", // Redirect after payment
            "customization[title]": "Payment for Service",
            "customization[description]": "Payment for services rendered."
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.CHAPA_SECRET_KEY}`, // Your Chapa Secret Key
                'Content-Type': 'application/json'
            }
        });

        // Chapa's response will contain a checkout_url
        res.json(response.data);

    } catch (error) {
        console.error('Chapa API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to initialize payment', details: error.response ? error.response.data : error.message });
    }
});

// Basic GET route for testing if the server is running (optional)
app.get('/', (req, res) => {
    res.send('Chapa payment backend is running!');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});