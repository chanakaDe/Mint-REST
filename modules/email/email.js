import MailComposer from './templates/index';
import nodeMailer from 'nodemailer';
import config from '../../util/config';

let mailComposer = new MailComposer();

let transporter = nodeMailer.createTransport({
            service: config.email.provider,
            auth: {
                user: config.email.user,
                pass: config.email.key
            }
        });

let sendMail = (mailOption) => { 
     transporter.sendMail(mailOption, function(error, info){
            if (error) {
                console.log(error);
                return;
            }
            console.log('Mail sent: ' + info);
     });
 }

export default class Mail{
    
    sendWelcomeMail(content){
        mailComposer.welcomeMail({name:content.name}).then((result) => {
            let mailOption = {
                from : config.email.defaultFrom,
                to : content.email,
                subject : result.subject,
                html : result.template,
                debug:true
            };
            sendMail(mailOption);
        }, (error) => {
            console.error('failter get email template ',error);
        });
    };

    sendVerificationMail(){
        /**
         * content goes here
         */
    };

    /**
     * @param
     * content {
     * to : string , //receipient email,
     * resetLink : string //host address and userToken  with one hour validity as a queryparam to reset password
     * }
     */
    sendResetPasswordMail(content){
        mailComposer.resetPasswordMail(content).then((result) => {
            let mailOption = {
                from : config.email.defaultFrom,
                to : content.to,
                subject : result.subject,
                html : result.template,
                debug:true
            };
            sendMail(mailOption);
        }, (error) => {
            console.error('failter get email template ',error);
        });
    }
    
}

