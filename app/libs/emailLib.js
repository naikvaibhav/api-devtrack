const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const moment = require("moment");
const time = require("./timeLib");

let emailOnResetPassword = (email, link) => {
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL_ADDRESS,
    template_id: process.env.SENDGRID_FORGOT_PASSWORD_TEMPLATE,
    dynamic_template_data: {
      link: link,
    },
  };
  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

module.exports = {
  emailOnResetPassword: emailOnResetPassword,
};
