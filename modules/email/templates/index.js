/**
 * import all kind of mail template and export as single object
 */
import emailTemplate from 'email-templates';
import path from 'path';

let EmailTemplate = emailTemplate.EmailTemplate;

let welcomeMailTemplate = new EmailTemplate(path.join(__dirname,'welcome'));
let resetPasswordMailTemplate = new EmailTemplate(path.join(__dirname,'resetpassword'));



export default class MailComposer{

    welcomeMail(dataSet){
       return new Promise((promiseSuccess,promiseFailure) => {
           welcomeMailTemplate.render(dataSet,(err,result) => {
               if(err){
                   promiseFailure({error:true,errorTrace:err});
               }else{
                   let mailContent = {
                       subject : "Welcome to Mint-Rest",
                       template : result.html
                   }
                   console.log('parsed mail content ',mailContent);
                   promiseSuccess(mailContent);
               }
           });
       });
    }

    resetPasswordMail(dataSet){
        return new Promise((promiseSuccess,promiseFailure) => {
            resetPasswordMailTemplate.render(dataSet, ( err, result ) => {
                if(err){
                   promiseFailure({error:true,errorTrace:err});
               }else{
                   let mailContent = {
                       subject : "Reset your Password",
                       template : result.html
                   }
                   console.log('parsed mail content ',mailContent);
                   promiseSuccess(mailContent);
               }
            });
        });
    }
}

