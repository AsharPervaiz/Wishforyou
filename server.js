const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Email sending route
app.post('/send-email', async (req, res) => {
    const { message } = req.body;

    try {
        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use Gmail or your preferred email service
            port:465,
            secure: true,
            auth: {
                user: 'asharpervaiz2018@gmail.com', // Replace with your email
                pass: 'zzlj vjci scdt famr', // Replace with your app password
            },
        });

        // Email options
        const mailOptions = {
            from: 'chaseandcart@gmail.com',
            to: 'asharpervaiz2018@gmail.com', // Replace with your recipient email
            subject: 'Birthday Message Received',
            text: `You received the following message: ${message}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
