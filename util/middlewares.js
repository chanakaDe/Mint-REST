import jsonwebtoken from 'jsonwebtoken';
import config from './config';
import {errorMessages as errorCode} from './constant'

export default class Middleware{

    static createToken(user) {
        let token = jsonwebtoken.sign({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }, config.secretKey, {
            expiresIn : 60*60*24
        });
        return token;
    }

    static validateToken(req,res,next){
        let token = req.body.token || req.param('token') || req.headers['x-access-token'];

        // Check if token exists.
        if (token) {
            jsonwebtoken.verify(token, config.secretKey, function (err, decoded) {
                if (err) {
                    res.status(403).send({success: false, message: errorCode.TOKEN_AOUTH_FAILED});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send({success: false, message: errorCode.INVALID_TOKEN});
        }
    }

}