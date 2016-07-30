import mongoose from 'mongoose';
/**
 * Creating Story Schema.
 * @type {*|Schema}
 */
var StorySchema = new mongoose.Schema({
    owner: String,
    title: String,
    content: String,
    category: String,
    publishStatus: String,
    created: {type: Date, default: Date.now}
});

export default StorySchema;
