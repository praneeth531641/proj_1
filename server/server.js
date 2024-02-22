// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const mysql = require('mysql');
// const bcrypt = require('bcrypt');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//     session({
//         secret: 'passwordbabai',
//         resave: false,
//         saveUninitialized: true,
//     })
// );

// app.use(cors());

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'users',
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database: ', err);
//         return;
//     }
//     console.log('Connected to the database');
// });

// wss.on('connection', function connection(ws) {
//     console.log('A new client connected');

//     ws.on('message', function incoming(message) {
//         console.log('received: %s', message);
//     });

//     ws.send('Hello! You are connected.');
// });

// // Admin credentials
// const adminCredentials = {
//     email: 'praneethu@gmail.com',
//     password: 'Tharun@98', // Hash and salt the password in a real-world scenario
// };

// // Create 'users' table if not exists
// const createUsersTableQuery = `
//     CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         email VARCHAR(255) NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         approved BOOLEAN DEFAULT false
//     )
// `;

// db.query(createUsersTableQuery, (err) => {
//     if (err) throw err;
//     console.log('Users table created or already exists');
// });

// // Login Route
// app.post('/login', async(req, res) => {
//     const { email, password } = req.body;

//     try {
//         const findUserQuery = 'SELECT * FROM users WHERE email = ?';
//         const result = await queryDatabase(findUserQuery, [email]);

//         if (result.length === 0) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }

//         const user = result[0];

//         // Compare password
//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }

//         // Optional: Check if the user is approved
//         if (!user.approved) {
//             return res.status(403).json({ error: 'User not approved by admin' });
//         }

//         // Check if the user is an admin
//         if (email === adminCredentials.email && password === adminCredentials.password) {
//             // Redirect or respond with a token indicating admin status
//             return res.status(200).json({ message: 'Admin login successful' });
//         }

//         // Login successful
//         req.session.user = user; // Save user info in session
//         res.json({ message: 'Login successful' });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// // Registration route
// app.post('/register', async(req, res) => {
//     const { email, password } = req.body;

//     // Check if the email is already registered
//     const checkDuplicateQuery = 'SELECT * FROM users WHERE email = ?';
//     const duplicateUser = await queryDatabase(checkDuplicateQuery, [email]);

//     if (duplicateUser.length > 0) {
//         return res.status(400).json({ error: 'Email already registered' });
//     }

//     // Encrypt the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user into the database with 'approved' set to false by default
//     const insertUserQuery = 'INSERT INTO users (email, password, approved) VALUES (?, ?, false)';
//     await queryDatabase(insertUserQuery, [email, hashedPassword]);

//     return res.status(201).json({ message: 'Registration successful. Awaiting admin approval.' });
// });

// // Admin approval route
// app.post('/admin/approve', async(req, res) => {
//     const { adminEmail, adminPassword, userEmailToApprove } = req.body;

//     // Check if the admin credentials are valid
//     const checkAdminQuery = 'SELECT * FROM admins WHERE email = ? AND password = ?';
//     const admin = await queryDatabase(checkAdminQuery, [adminEmail, adminPassword]);

//     if (admin.length === 0) {
//         return res.status(401).json({ error: 'Invalid admin credentials' });
//     }

//     // Update user approval status in the database
//     const updateUserQuery = 'UPDATE users SET approved = true WHERE email = ?';
//     await queryDatabase(updateUserQuery, [userEmailToApprove]);

//     return res.status(200).json({ message: 'User approved successfully' });
// });

// const port = 5000;
// server.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// // Function to query the database
// async function queryDatabase(query, values) {
//     return new Promise((resolve, reject) => {
//         db.query(query, values, (err, result) => {
//             if (err) reject(err);
//             resolve(result);
//         });
//     });
// }
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'passwordbabai',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(cors());

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

// Admin credentials (change this to use environment variables)
const adminCredentials = {
    email: 'jamalraju',
    password: 'jankai', // Hash and salt the password in a real-world scenario
};

// Create 'users' table if not exists
const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        approved BOOLEAN DEFAULT false
    )
`;

db.query(createUsersTableQuery, (err) => {
    if (err) throw err;
    console.log('Users table created or already exists');
});

// Login Route
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
        if (email === adminCredentials.email && password === adminCredentials.password) {
            isAdmin = true
                // Redirect or respond with a token indicating admin status
            return res.status(200).json({ isAdmin: true });
        }

        // Login successful
        req.session.user = user; // Save user info in session
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Registration route
app.post('/register', async(req, res) => {
    const { email, password } = req.body;

    // Check if the email is already registered
    const checkDuplicateQuery = 'SELECT * FROM users WHERE email = ?';
    const duplicateUser = await queryDatabase(checkDuplicateQuery, [email]);

    if (duplicateUser.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database with 'approved' set to false by default
    const insertUserQuery = 'INSERT INTO users (email, password, approved) VALUES (?, ?, false)';
    await queryDatabase(insertUserQuery, [email, hashedPassword]);

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

// Endpoint to approve/disapprove a user
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

// Function to query the database
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