// Looking to send emails in production? Check out our Email API/SMTP product!
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
import dotenv from 'dotenv'
dotenv.config()

const TOKEN = process.env.TOKEN_NODEMAILER;

export const transporter = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    sandbox: true,
    testInboxId: 4252770,
  })
);

