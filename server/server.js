const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// // In-memory storage for OTPs (You should use a database in a production environment)
// const otpStorage = {};

// // Nodemailer setup (You should configure this with your email service details)
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'rpraneeth.19.cse@anits.edu.in',
//         password: 'Tharun@98',
//     },
// });

// app.post('/send-otp', (req, res) => {
//     console.log('Received send-otp request');
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ error: 'Email is required' });
//     }

//     const otp = randomstring.generate({
//         length: 6,
//         charset: 'numeric',
//     });

//     otpStorage[email] = otp;
//     const mailOptions = {
//         from: 'rpraneeth.19.cse@anits.edu.in',
//         to: email,
//         subject: 'Password Reset OTP',
//         text: `Your OTP for password reset is: ${otp}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Failed to send OTP email:', error);
//             return res.status(500).json({ error: 'Failed to send OTP email' });
//         }

//         console.log('OTP email sent successfully:', info);
//         res.json({ message: 'OTP sent successfully' });
//     });
// });
// In-memory storage for OTPs (You should use a database in a production environment)
const otpStorage = {};

// Nodemailer setup (You should configure this with your email service details)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rpraneeth.19.cse@anits.edu.in',
        pass: 'welf xxoh hlkt tvct',
    },
});

// Verify transporter setup
transporter.verify((error) => {
    if (error) {
        console.error('Transporter setup failed:', error);
    } else {
        console.log('Transporter is ready to send emails');
    }
});

app.post('/send-otp', async(req, res) => {
    console.log('Received send-otp request');
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const otp = randomstring.generate({
        length: 6,
        charset: 'numeric',
    });

    otpStorage[email] = otp;

    const mailOptions = {
        from: 'rpraneeth.19.cse@anits.edu.in',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
    };


    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully:', info);
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        res.status(500).json({ error: 'Failed to send OTP email', details: error.message });
    }
});
app.post('/send-otp1', async(req, res) => {
    console.log('Received send-otp request');
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const otp = randomstring.generate({
        length: 6,
        charset: 'numeric',
    });

    otpStorage[email] = otp;

    const mailOptions = {
        from: 'rpraneeth.19.cse@anits.edu.in',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your Otp for your login is: ${otp}`,
    };


    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully:', info);
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        res.status(500).json({ error: 'Failed to send OTP email', details: error.message });
    }
});
app.post('/reset-password', async(req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Hash the new password before storing it
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database based on the email
        const updatePasswordQuery = 'UPDATE users SET password = ? WHERE email = ?';
        await queryDatabase(updatePasswordQuery, [hashedPassword, email]);

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
});



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the database');
});

wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('Hello! You are connected.');
});

// const adminCredentials = {
//     email: 'mrunalbondade@gmail.com',
//     password: 'Marvella@11', // Hash and salt the password in a real-world scenario
// };
const adminCredentials = {
    email: 'praneethrayavarapu@gmail.com',
    password: 'Tharun@98', // Hash and salt the password in a real-world scenario
};

app.post('/get-user-data', (req, res) => {
    const { email } = req.body;
    const query = 'SELECT * FROM users WHERE useremail = ?';

    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        // Assuming results[0] contains the user data
        const userData = {
            username: results[0].username,
            dateOfBirth: results[0].dob,
            address: results[0].address,
            // Add any other fields you want to include
        };

        res.json(userData);
    });
});


app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required for verification' });
    }
    const storedOTP = otpStorage[email];
    if (!storedOTP) {
        return res.status(404).json({ error: 'OTP not found for the provided email' });
    }

    if (otp === storedOTP) {
        delete otpStorage[email];

        return res.json({ message: 'OTP verified successfully' });
    } else {
        // Incorrect OTP
        return res.status(401).json({ error: 'Incorrect OTP' });
    }
});


const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name   VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        approved BOOLEAN DEFAULT false,
        dob  Date ,
        address VARCHAR(255) NOT NULL
    )
`;

db.query(createUsersTableQuery, (err) => {
    if (err) throw err;
    console.log('Users table created or already exists');
});


app.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const findUserQuery = 'SELECT * FROM users WHERE email = ?';
        const result = await queryDatabase(findUserQuery, [email]);

        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result[0];

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Optional: Check if the user is approved
        if (!user.approved) {
            return res.status(403).json({ error: 'User not approved by admin' });
        }

        // Check if the user is an admin
        if (email === adminCredentials.email) {
            isAdmin = true;

            // Redirect or respond with a token indicating admin status
            return res.status(200).json({
                isAdmin: true,
                email // Include email in the response if needed
                // Add other user details you want to include in the response
            });
        }

        res.json({
            message: 'Login successful',
            email: user.email,
            name: user.name


        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Registration route
app.post('/register', async(req, res) => {
    const { email, name, password, dob, address } = req.body;

    // Check if the email is already registered
    const checkDuplicateQuery = 'SELECT * FROM users WHERE email = ?';
    const duplicateUser = await queryDatabase(checkDuplicateQuery, [email]);

    if (duplicateUser.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database with 'approved' set to false by default
    const insertUserQuery = 'INSERT INTO users (email,name, password, approved,dob,address) VALUES (?,?, ?, false,?,?)';
    await queryDatabase(insertUserQuery, [email, name, hashedPassword, dob, address]);

    return res.status(201).json({ message: 'Registration successful. Awaiting admin approval.' });
});

// Admin approval route
app.post('/admin/approve', async(req, res) => {
    isAdmin = false;
    const { adminEmail, adminPassword, userEmailToApprove } = req.body;

    // Check if the user is an admin
    if (adminEmail === adminCredentials.email && adminPassword === adminCredentials.password) {
        // Update user approval status in the database
        const updateUserQuery = 'UPDATE users SET approved = true WHERE email = ?';
        await queryDatabase(updateUserQuery, [userEmailToApprove]);

        return res.status(200).json({ message: 'User approved successfully' });
    } else {
        return res.status(401).json({ error: 'Invalid admin credentials' });
    }
});

app.get('/dashboard', (req, res) => {
    db.query('SELECT id, email, approved FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Error fetching users' });
        }

        res.json(results);
    });
});

// server.js (Updated)
// ... (Other imports and configurations)

// Endpoint for changing the password
app.post('/change-password', async(req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Hash the new password before storing it
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database based on the email
        const updatePasswordQuery = 'UPDATE users SET password = ? WHERE email = ?';
        await queryDatabase(updatePasswordQuery, [hashedPassword, email]);

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
});


app.post('/dashboard/approve', (req, res) => {
    const { userId, newApprovalStatus } = req.body;

    db.query('UPDATE users SET approved = ? WHERE id = ?', [newApprovalStatus, userId], (err) => {
        if (err) {
            console.error('Error updating user approval status:', err);
            return res.status(500).json({ error: 'Error updating user approval status' });
        }

        res.json({ success: true });
    });
});

const port = 5000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

async function queryDatabase(query, values) {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Database query error:', err);
                reject(err);
            }
            resolve(result);
        });
    });
}