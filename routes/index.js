import express from 'express';
import userServices from './user';
import storyService from './story';

let router = express.Router();

userServices(router);
storyService(router);

export default router;
