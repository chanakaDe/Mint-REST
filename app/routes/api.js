var User = require('../models/user');
var Story = require('../models/story');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

// Create a new token for logged in user.
function createToken(user) {
    var token = jsonwebtoken.sign({
        _id: user._id,
        name: user.name,
        username: user.username
    }, secretKey, {
        expirtsInMinute: 1440
    });
    return token;
}

module.exports = function (app, express) {

    var api = express.Router();

    // Save new user to the system.
    api.post('/signup', function (req, res) {

        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });

        user.save(function (err) {
            if (err) {
                res.send(err);
                return;
            }
            res.json({message: "User has been created !!!!"});
        });
    });

    // Get all users from the system.
    api.get('/users', function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(users);
        });
    });

    // Create new login for users.
    api.post('/login', function (req, res) {
        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send({message: "User doenst exist"});
            } else if (user) {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.send({message: "Invalid Password"});
                } else {
                    var token = createToken(user);
                    res.json({
                        success: true,
                        message: "Successfuly login!",
                        token: token
                    });
                }
            }
        });
    });

// Create logging check middleware.
    api.use(function (req, res, next) {
        console.log("Somebody logged into system");
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];

        // Check if token exists.
        if (token) {
            jsonwebtoken.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    res.status(403).send({success: false, message: "Failed to authenticate"});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send({success: false, message: "No valid token provided"});
        }
    });

    //Creating multi routes.
    api.route('/post')
        .post(function (req, res) {
            var story = new Story({
                owner: req.decoded._id,
                content: req.body.content
            });
            story.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                    return
                }
                res.json({message: "New Story Created"});
            });
        })
        .get(function (req, res) {
            Story.find({owner: req.decoded.id}, function (err, stories) {
                if (err) {
                    res.send(err);
                    return
                }
                res.json(stories);
            });
        });

    /**
     * Getting about logged user.
     */
    api.get('/me', function (req, res) {
        res.send(req.decoded);
    });

    // Returning the api.
    return api;
};
