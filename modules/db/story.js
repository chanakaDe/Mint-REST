import * as db from './schema/index';
import {successMessages} from '../../util/constant';

export default class Story{
    /**
     * create and save new story
     * @param data {
     * owner : userId,
     * title : string,
     * content : string,
     * category : string,
     * publishStatus : boolean
     * }
     */
    create(data = {},callback){
        let story = new db.Story(data);
        story.save((err,story) => {
             if(err) {
                 callback ({error:true,errorTrace:err});
                 return;
             }
             callback (story);
        })
    }

    /**
     * update a story with given storyid
     * @param data {
     * sotryId : mongooseId
     * owner : userId,
     * title : string,
     * content : string,
     * category : string,
     * publishStatus : boolean
     * }
     */
    update(data,callback){
        db.Story.findOneAndUpdate({'_id': data.storyId}, data, function (err,story) {
            if(err){ callback ({error:true,errorTrace:err}); return}

            callback ({success:true,message: successMessages.STORY_UPDATED});
        });
    }

    getById(id,callback){
        db.Story.findOne({_id:id},(err,story) => {
            if(err) {callback ({error:true,errorTrace:err}); return;}
            callback (story);
        })
    }

    getByUserId(userId,callback){
         db.Story.find({owner: userId},(err, stories) => {
            if (err) {callback ({error:true,errorTrace:err});return;};

           callback (stories);
        });
    }

    getAll(callback){
        db.Story.find({'publishStatus': 1},(err,stories) => {
            if(err) {callback ({error:true,errorTrace:err});return;};
            callback (stories);
        });
    }

    search(criteria,callback){
        db.Story.find({$and:[{'content': new RegExp(criteria,'i')},{'publishStatus':1}]}, (err,stories) => {
            if(err) {callback ({error:true,errorTrace:err});return}
            callback (stories);
        })
    }

    delete(id,callback){
        db.Story.remove({_id:id},(err) => {
            if(err) {callback ({error:true,errorTrace:err});return;}
            callback ({success:true,message:successMessages.STORY_REMOVED})
        })
    }

    getByCategory(category,callback){
        db.Story.find({$and: [{category: category}, {'publishStatus': 1}]}, function (err, stories) {
           
            if (err) {callback ({error:true,errorTrace:err});return;}

            callback (stories);
        });
    }
}