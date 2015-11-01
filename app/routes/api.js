var User = require('../models/user');
var Story = require('../models/story');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');
/**
 * Create new user token for verification.
 * @param user
 * @returns {number}
 */
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
    /**
     * Create new user and save in database.
     */
    api.post('/signup', function (req, res) {
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        var toekn = createToken(user);
        user.save(function (err) {
            if (err) {
                res.send(err);
                return;
            }
            res.json({
                success: true,
                message: "User has been created",
                token: toekn
            });
        });
    });
    /**
     * Get all users from the database.
     */
    api.get('/users', function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(users);
        });
    });
    /**
     * Taking username and password.
     * Creating a new login.
     */
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
    /**
     * Get all user stories from server..
     */
    api.get('/stories', function (req, res) {
        Story.find({'publishStatus':1}, function (err, stories) {
            if (err) {
                res.send(err);
                return
            }
            res.json(stories);
        });
    });
    /**
     * Get specific story details from server
     * with provided story id.
     */
    api.get('/story', function (req, res) {
        Story.find({_id: req.param('id')}, function (err, story) {
            if (err) {
                res.send(err);
                return
            }
            res.json(story);
        });
    });

    /**
     * Removing the selected story
     * from server.
     */
    api.get('/remove_story', function (req, res) {
        Story.remove({_id: req.param('id')}, function (err) {
            if (err) {
                res.send(err);
                return
            }
            res.json({message : "Successfuly removed" , type : "success"});
        });
    });

    /**
     * Check logged status in order to
     * give permission to following links.
     */
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
    /**
     * Create new story.
     */
    api.post('/story', function (req, res) {
        var story = new Story({
            owner: req.decoded._id,
            title: req.body.title,
            content: req.body.content,
            category : req.body.category,
            publishStatus : req.body.publishStatus
        });
        story.save(function (err) {
            if (err) {
                res.status(500).send(err);
                return
            }
            res.json({message: "New Story Created"});
        });
    });
    /**
     * Get all user stories from server with registered user id..
     */
    api.get('/story_of_user', function (req, res) {
        Story.find({owner: req.decoded._id}, function (err, stories) {
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
        res.json(req.decoded);
        console.log(req.decoded);
    });

    /**
    * Update story model with data from req.
    **/
    api.post('/update_story', function (req, res) {
        var story = {
            owner: req.decoded._id,
            title: req.body.title,
            content: req.body.content,
            category : req.body.category,
            publishStatus : req.body.publishStatus
        };
        console.log("Story : ", story);
        Story.findOneAndUpdate({'_id': req.body.storyId} , story , function (err) {
            if (err) {
                res.status(500).send(err);
                return
            }
            res.json({message: "Story updated successfully"});
        });
    });

    /**
    * Search all the stories and return data that matches with
    * provided query and critiria.
    **/
    api.get('/search_story', function (req, res) {
        Story.find({'content' : new RegExp(req.param('query'), 'i')}, function (err, stories) {
            if (err) {
                res.send(err);
                return
            }
            res.json(stories);
        });
    });

    /**
     * Returning the API.
     */
    return api;
};
