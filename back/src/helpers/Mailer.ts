const nodemailer = require('nodemailer')
require('dotenv').config()

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.MAIL_SERVICE}`,
    pass: `${process.env.PASS_MAIL}`,
  },
})

transporter.verify().then(() => {
  console.log('Email server running...')
})
