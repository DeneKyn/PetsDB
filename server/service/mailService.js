import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

export let mailBody = (to, url, subject, bodyText, urlText) => {
  return {
    from: `"AnimalsDB" <${process.env.MAILER_EMAIL}>`,
    to: `${to}`,
    subject: `${subject}`,
    text: `${subject}`,
    html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Animals Database.</h2>
    <p>${bodyText}
    </p>
    
    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${urlText}</a>

    <p>If the button doesn't work for any reason, you can also click on the link below:</p>

    <div style="word-wrap: break-word; font-size: 14px;">${url}</div>
    </div>
`,
  };
};
