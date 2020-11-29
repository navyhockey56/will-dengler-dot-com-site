const mailer = require('nodemailer');

const host = process.env.EMAIL_HOST;
const port = process.env.EMAIL_PORT;
const sendFrom = process.env.EMAIL_SEND_FROM;
const sendTo = process.env.EMAIL_SEND_TO;
const emailPassword = process.env.EMAIL_PASSWORD;

const transport = mailer.createTransport({
  host,
  port,
  auth: {
    user: sendFrom,
    pass: emailPassword
  }
});

module.exports = ({ subject, body }) => {
  const message = {
    from: sendFrom,
    to: sendTo,
    subject,
    text: body
  };

  transport.sendMail(message, (error, info) => {
    if (error) {
      console.error("An error occurred when trying to send an email", error);
    } else {
      console.log("Successfully sent mail", info);
    }
  })
}
