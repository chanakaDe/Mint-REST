import Story from '../modules/db/story';
import Middleware from '../util/middlewares';

let STORY = new Story();

export default (router) => {

    /**
     * Get all user stories from server..
     */
    router.get('/stories', (req, res) => {
        STORY.getAll((stories) => res.send(stories));
    });

    /**
     * Get specific story details from server
     * with provided story id.
     */
    router.get('/story', (req, res) => {
        STORY.getById(req.query.id, (story) => res.send(story));
    });

     /**
     * Search all the stories and return data that matches with
     * provided query and criteria.
     **/
    router.get('/search_story', (req, res) => {
        STORY.search(req.query.query, (stories) => res.send(stories));
    });

    /**
     * Search stories according to the given category.
     */
    router.get('/search_story_by_category', (req, res) => {
        STORY.getByCategory(req.query.category, (stories) => res.send(stories));
    });

     /**
     * Removing the selected story
     * from server.
     */
    router.delete('/remove_story', Middleware.validateToken, (req, res) => {
        STORY.delete(req.query.id, (status) => res.send(status));
    });

     /**
     * Create new story.
     */
    router.post('/story', Middleware.validateToken, (req, res) => {
        req.body.owner = req.decoded._id;
        STORY.create(req.body, (data) => {
            if (data.err) {
                res.status(500).send(err);
                return
            }
            res.send(data);
        });
    });

    /**
     * Get all user stories from server with registered user id..
     */
    router.get('/story_of_user', Middleware.validateToken, (req, res) => {
        STORY.getByUserId(req.decoded._id, (story) => res.send(story));
    });

    /**
     * Update story model with data from req.
     **/
    router.post('/update_story', Middleware.validateToken, (req, res) => {
        req.body.owner = req.decoded._id;
        STORY.update(req.body, (status) => {
            if(status.err){
                res.status(500).send(err);
                return
            };
            res.send(status);
        })
    });
}