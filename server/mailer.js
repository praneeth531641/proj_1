// mailer.js

const nodemailer = require('nodemailer');

// Create a transporter with your SMTP configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rpraneeth.19.cse@anits.edu.in',
        pass: 'Tharun@98',
    },
});

// Function to send emails
const sendEmail = async(to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: 'rpraneeth.19.cse@anits.edu.in',
            to,
            subject,
            text,
        });

        console.log('Email sent: ', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
};

module.exports = { transporter, sendEmail };