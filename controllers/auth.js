const { User } = require('../models'); // Sesuaikan path sesuai struktur proyek Anda
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const moment = require('moment');

// Konfigurasi transport untuk Node Mailer (sesuaikan dengan penyedia email Anda)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'imamasyari330@gmail.com',
        pass: 'imambae123'
    }
});

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = jwt.sign({ userId: user.id, email: user.email }, 'your_very_strong_secret_key', { expiresIn: '1h' });

            // Waktu login menggunakan Moment.js
            const loginTime = moment().format('MMMM Do YYYY, h:mm:ss a');

            // Kirim email menggunakan Node Mailer
            const mailOptions = {
                from: 'your_email@gmail.com',
                to: user.email,
                subject: 'Login Detected',
                text: `Login successful! Your account has been accessed at ${loginTime}.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email: ', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });


            // Set cookie dan kembalikan respons
            res.cookie('jwtToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict'
            });

            return res.status(200).json('Login successful!');
        } else {
            return res.status(401).send('Incorrect password');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

const logout = (req, res) => {
    res.clearCookie('jwtToken');
    return res.status(200).json('Logout successful!');
};

module.exports = {
    login,
    logout
};
