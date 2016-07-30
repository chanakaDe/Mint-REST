import mailTemplates from './templates/index';
import nodeMailer from 'nodemailer';
import config from '../../util/config';

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
            }
            console.log('Mail sent: ' + info);
     });
 }

export default class Mail{
    
    sendWelcomeMail(receipient){
        let mailOption = {
            from : config.email.defaultFrom,
            to : receipient,
            subject : mailTemplates.welcomeMail.subject,
            html : mailTemplates.welcomeMail.template,
            debug:true
        }
        sendMail(mailOption);
    }

    sendVerificationMail(){
        /**
         * content goes here
         */
    }

    sendForgetPasswordMail(){
        /**
         * content goes here
         */
    }
    
}

