const emailService = {
  sendEmail: (to, subject, content) => {
    console.log({
      to,
      subject,
      content,
    });
    return true;
  },
};
module.exports = emailService;
