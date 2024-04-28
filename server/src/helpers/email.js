const nodemailer = require('nodemailer')

const configEmail = require('../config/email')

const transporter = nodemailer.createTransport(configEmail)

const sendEmail = (data, cb) => {
  transporter.sendMail(data, (error, info) => {
    if (error) return cb('Falha ao enviar email.')
    return cb('Email enviado com sucesso.')
  })
}

module.exports = sendEmail
