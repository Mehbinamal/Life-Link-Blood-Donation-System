const nodemailer = require("nodemailer");

const sendEmail = async (Option) => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        secure: process.env.EMAIL_PORT == 465, 
    });

    const emailOptions = {
        from: '"Life Link Blood Donation" <no-reply@example.com>',
        to: Option.email, 
        subject: Option.subject,
        text: Option.message,
    };

    try {
        await transporter.sendMail(emailOptions);
    } catch (error) {
        console.error("Email Sending Failed:", error);
    }
};

module.exports = sendEmail;
