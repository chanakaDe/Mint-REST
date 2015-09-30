var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StorySchema = new Schema({

    owner: String,
    content: String,
    created: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Story', StorySchema);
