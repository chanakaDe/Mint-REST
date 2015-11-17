/**
 * Created by chanaka on 11/17/15.
 */
var nodemailer = require("nodemailer");

/**
 * Creating global function to send email.
 * @type {{sendMail: Function}}
 */
module.exports = {
    sendMail: function (reciever) {

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'chanu1993@gmail.com',
                pass: 'mintbooksv1'
            }
        });

        var mailOptions = {
            from: 'MintBlogger ✔ <foo@blurdybloop.com>', // sender address
            to: reciever, // list of receivers
            subject: 'WELCOME TO BLOGGER ✔', // Subject line
            text: 'Hello world ✔', // plaintext body
            html: '<div style="width: 100%;height: 100%;background-color: #c5c9c1">' +
            '<h2 style="text-align: center">Welcome to blogging world</h2>' +
            '<h4 style="text-align: center">The ultimate blogging platform for tech geeks and developers</h4>' +
            '<hr>' +
            '<p>Hi , You are warmly welcome here. With this new blogging platform , you can do following,</p>' +
            '<ul>' +
            ' <li>Create tremendous blog sites quickly.</li>' +
            '<li>Use this api as your own.</li>' +
            '<li>Get the blogging REST API service.</li>' +
            '<li>Get 100% free community support.</li>' +
            '</ul>' +
            '<hr>' +
            '<h5 style="text-align: center">Thank you</h5>' +
            '</div>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);

        });
    }
};