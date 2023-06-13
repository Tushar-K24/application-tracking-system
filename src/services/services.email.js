const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();

const emailService = async (emailData, template) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.ETHEREAL_USER, // generated ethereal user
      pass: process.env.ETHEREAL_PASSWORD, // generated ethereal password
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: "nodemailer-express-handlebars",
      viewPath: "../templates/",
    })
  );
  await transporter.sendMail({
    from: '"ATS" <ats@gmail.com>', // sender address
    to: emailData.to, // list of receivers
    subject: emailData.subject, // Subject line
    // text: "Hello world?", // plain text body
    html: template, // html body
    context: emailData.context,
  });
  console.log("Mail sent successfully");
};

module.exports = emailService;
