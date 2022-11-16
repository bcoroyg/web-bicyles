import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import pug from 'pug';
import juice from 'juice';
import { convert } from 'html-to-text';
import { fileURLToPath } from 'url';
import config from '../../config/index.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

let mailConfig;
if (config.dev) {
  mailConfig = {
    host: config.mailHost,
    port: Number(config.mailPort),
    auth: {
      user: config.mailUser,
      pass: config.mailPassword,
    },
  };
} else {
  /* mailConfig = {
    host: config.mailHost,
    port: Number(config.mailPort),
    secure: true,
    auth: {
      user: config.mailUser,
      pass: config.mailPassword,
    },
  }; */
  const options = {
    auth: {
      api_key: config.sendgridApiSecret,
    },
  };
  mailConfig = sgTransport(options);
}

const generateHTML = (file, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}../../views/email/${file}.pug`,
    options
  );
  return juice(html);
};

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport(mailConfig);
  //Utilizar template
  const html = generateHTML(options.file, options);
  const text = convert(html);
  const optionsMail = {
    from: `${options.subject} <${options.from}>`,
    to: options.to,
    subject: options.subject,
    text,
    html,
  };
  // send mail with defined transport object
  return await transporter.sendMail(optionsMail);
};

export default sendMail;
