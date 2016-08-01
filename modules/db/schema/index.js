import mongoose from 'mongoose';
import user from './user.schema';
import story from './story.schema';
import config from '../../../util/config';

mongoose.connect(config.dbUrl,(status) => {
    console.log('mongodb connected',status);
});

let db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.on('opne', (status) => console.log('db connection opened ',status));

let User = mongoose.model('User',user);
let Story = mongoose.model('Story',story);

export { User, Story};