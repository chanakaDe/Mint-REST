/**
 * All user related db opeation will be done here.
 * 
 */
import * as db from './schema/index';
import {errorMessages as errorCode , successMessages as successCode}  from '../../util/constant';

export default class User {

    /**
     * Create new user and save in database.
     */
    signup(data = {},callback = () => {}){
        if(!data.email || !data.password || !data.username){
            callback({error:true,errorTrace:errorCode.REQUIRED_FIELD_MISSING});
        }

        let user = new db.User(data);

        user.save((err,newUser) => {
            if(err) {
                callback({error:true,errorTrace:err});
                return;
            }
            callback(newUser);
        });
    }

    /**
     * authendicates user with credentials
     */
    login(data = {},callback = () => {}){
        if(!data.username || !data.password){
            callback(errorCode.REQUIRED_FIELD_MISSING);
        }

        db.User.findOne({username:data.username},'name username password',(err,user) => {
            if(err){
                callback( {error:true,errorTrace:err});
                return;
            }

            if(!user.comparePassword(data.password)){
                callback ({error:true,errorTrace:errorCode.INVALID_CREDENTIAL});
                return;
            }

            callback (user);

        });
    }

    /**
     * retrive user by given emailId
     */
    getByEmail(email, callback = () => {}){
        if(!email){
            callback ({error:true,errorTrace:errorCode.REQUIRED_FIELD_MISSING});
            return;
        }
        db.User.findOne({email:email},(err,user) => {
            if(err) {callback ({error:true,errorTrace:err}); return;}

            callback (user);

        });
    }

    /**
     * returns all users from User collection
     */
    getAll(callback = () => {}){
        db.User.find({},(err,users) => {
            if(err){
                callback ({error:true,errorTrace:err});
                return;
            }

            callback (users);
        })
    };


    changePassword(data,callback){
        db.User.findByIdAndUpdate(data._id,{$set : {password: data.password}}, (err, user) => {
             if(err){
                callback ({error:true,errorTrace:err});
                return;
            }

            callback ({success:true, message : successCode.PASSWORD_CHANGED});
        });
    };



}