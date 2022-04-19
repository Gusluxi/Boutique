import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path:'./.env_mail' });

export function sendEmail(sendTo, withSubject, withText) {
    console.log(process.env.MAIL_USER, process.env.MAIL_PASS);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    let mailOptions = {
        from: process.env.MAIL_USER,
        to: sendTo,
        subject: withSubject,
        text: withText
    };
    
    transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
            console.log("transporter nodemailer error: ", err);
        } else {
            console.log("Email sent successfully to " + sendTo, success);
        }
    });
    
}
