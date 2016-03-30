# Mint-REST

##### A simple rest api using Node.js , MongoDB , Express and Mongoose as the ORM.

### Overview

This rest api created for a simple blogging platform with all the rest api standards. And also used MongoDB and the database and Mongoose as the ORM. Because Mongoose has a very good support at MongoDB. And also we have used following npm packages to create this rest api in a useful and structural way.

*   "bcrypt-nodejs": "0.0.3"
*    "body-parser": "^1.14.0"
*    "cors": "^2.7.1"
*    "express": "^4.13.3"
*    "jsonwebtoken": "^5.0.5"
*    "mongoose": "^4.1.8"
*    "morgan": "^1.6.1"

### Prerequisites

* NodeJS
* MongoDB server
* MongoDB query browser for speed developing.

### Setting up the app

Run npm install at the root folder to download dependencies.
And make sure your MongoDB server is running.

### Configuration

See the config.js file for more configuration options.
You can change your app's secreet key , MongoDB host and also app's default port.

### Api documentation

#### Signup URL
http://localhost:3000/api/signup
This is the object have to passed.
```javascript
{
 name: "",
 username: "",
 email: "",
 password: ""
}
```

#### Login URL
http://localhost:3000/api/login
```javascript
{
username: "",
password: ""
}
```

#### Users get all URL
http://localhost:3000/api/users

#### Stories get all URL
http://localhost:3000/api/stories

#### Get specific story with story ID URL
http://localhost:3000/api/story?id=1

#### Delete specific story with story ID URL
http://localhost:3000/api/remove_story?id=1

#### Search specific story with story ID URL
http://localhost:3000/api/search_story?query=mongo

#### Search stories according to category URL
http://localhost:3000/api/search_story_by_category?category=java

#### Search specific user with email URL
http://localhost:3000/api/searchUserWithEmail?email=chanu1993@gmail.com

> To access following links, user must be logged into the system and has a token.

#### Create new story URL
http://localhost:3000/api/story
```javascript
{
owner: "",
title: "",
content: "",
category: "",
publishStatus: ""
}
```

#### Get all stories according to user ID URL
http://localhost:3000/api/story_of_user

#### Update story URL
http://localhost:3000/api/update_story
```javascript
{
owner: "",
title: "",
content: "",
category: "",
publishStatus: ""
}
```

### References
[http://projectslanka.blogspot.com/2015/10/create-restful-api-using-nodejs-part-2.html](http://projectslanka.blogspot.com/2015/10/create-restful-api-using-nodejs-part-2.html)

