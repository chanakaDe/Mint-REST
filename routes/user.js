import User from '../modules/db/user';
import Middleware from '../util/middlewares';
import Email from '../modules/email/email';

let USER = new User();
let EMAIL = new Email();

export default (router) => {

  /**
   * Create new user and save in database.
   */
  router.post('/signup', (req, res) => {
    let user = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    USER.signup(req.body,(data) => {
      if(data.error){
        res.send(data);
        return;
      }
      
      let token = Middleware.createToken(user);
      res.send({success:true,token:token});
      /**
       * Sending email to registered user.
       */
      EMAIL.sendWelcomeMail(user.email);
    });
    
  });

   /**
     * Taking username and password.
     * Creating a new login.
     */
  router.post('/login', (req, res) => {
      USER.login(req.body,(data) => {
        if(data.error){
          res.send(data);
          return;
        }
      
        let token = Middleware.createToken(data);
        res.send({success:true,token:token});
      });
  });

  /**
   * Get all users from the database.
   */
  router.get('/users', (req, res) => {
      USER.getAll((data) => res.send(data));
  });

  /**
   * Search with the username and check if there is a user available or not.
   **/
  router.get('/searchUserWithEmail', (req, res) => {
      USER.getByEmail(req.query.email, (data) => res.send(data));
  });

  /**
   * Getting about logged user.
   */
  router.get('/me',Middleware.validateToken, (req, res) => res.json(req.decoded));

  
}

