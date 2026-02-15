const express = require('express');
const router = express.Router();

// Placeholder for Gemini AI Chatbot
// The user will share the API key later
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        // Mock response for now
        const mockReplies = [
            "Tentu! Paket Umroh kami mulai dari Rp 28 Jutaan. Ingin info lebih detail?",
            "Untuk Haji Khusus, kami memiliki program 28 hari dengan fasilitas hotel bintang 5.",
            "Anda bisa melakukan pembayaran via Transfer Bank (BCA, BSI, DKI, Bukopin) atau Payment Gateway.",
            "Silakan cek menu 'Packages' untuk melihat brosur flyer terbaru kami."
        ];

        const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];

        setTimeout(() => {
            res.json({ reply: randomReply });
        }, 1000);
    } catch (error) {
        res.status(500).json({ error: 'Chatbot error' });
    }
});

module.exports = router;
