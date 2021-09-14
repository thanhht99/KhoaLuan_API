const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const ErrorResponse = require("../model/statusResponse/ErrorResponse");

const oauth2Client = new OAuth2(
    "975574089843-tf5o6ou9f1stfbk29dmn682l8sdioktv.apps.googleusercontent.com", // ClientID
    "PW4mUSJAWuqdmENENYz59IKl", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
    refresh_token: "1//043mKMj3muRMxCgYIARAAGAQSNwF-L9IrFjS50ONzw-_Li9EcpomWPQ8PYiOT3oPFnFkYqa0OCh3ERA8npWMmzOSC1rm6Dsq09UY",
});
const accessToken = oauth2Client.getAccessToken();

class MailService {
    transporter;
    static init() {
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                type: "OAuth2",
                user: process.env.USER_MAIL,
                clientId: "975574089843-tf5o6ou9f1stfbk29dmn682l8sdioktv.apps.googleusercontent.com",
                clientSecret: "PW4mUSJAWuqdmENENYz59IKl",
                refreshToken: "1//043mKMj3muRMxCgYIARAAGAQSNwF-L9IrFjS50ONzw-_Li9EcpomWPQ8PYiOT3oPFnFkYqa0OCh3ERA8npWMmzOSC1rm6Dsq09UY",
                accessToken: accessToken,
            },
        });
    }
    static async sendMail(from, to, subject, html) {
        const info = await this.transporter
            .sendMail({
                from,
                to,
                subject,
                html,
            })
            .then((info) => {
                // console.log(info);
                console.log("===============================");
                console.log("Sent Email");
            })
            .catch((err) => {
                console.log(err);
                return next(
                    new ErrorResponse(502, "Error send mail. Please connect admin")
                );
            });
        return info;
    }
}

module.exports = MailService;