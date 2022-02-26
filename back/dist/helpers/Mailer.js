"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require('nodemailer');
require('dotenv').config();
exports.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: `${process.env.MAIL_SERVICE}`,
        pass: `${process.env.PASS_MAIL}`,
    },
});
exports.transporter.verify().then(() => {
    console.log('Email server running...');
});
