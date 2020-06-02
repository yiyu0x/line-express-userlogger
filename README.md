# line-express-userlogger

A express.js middleware can automatically record user information in LINE messages API nodejs-sdk.
This logger will be triggered by user with following event and unfollowing event.

(When user unfollows your bot, DB will clean his or her data.)

# Usage

Run mongoDB service in docker, make sure run at project root directory:

`docker run --rm -d --name mongo -p 27017:27017 -v $PWD/db_data:/data/db mongo`

Install middleware:

`npm install line-express-userlogger --save`

In [line-bot-sdk-nodejs](https://line.github.io/line-bot-sdk-nodejs/getting-started/basic-usage.html#synopsis), you can use webhook as below:

```javascript
app.post('/webhook', line.middleware(config), (req, res) => {
    //something...
});
```
Now, you just need to add userlogger in middleware:

```javascript
const userlogger = require('line-express-userlogger')
app.post('/webhook', line.middleware(config), userlogger, (req, res) => {
    //something...
});
```

When express.js server start, make sure `Connected to MongoDB` string show in console. 

# DB schema

In mongoDB shell:
```
>use line

switched to db line

>db.users.find({}).pretty()

{
	"_id" : ObjectId("5ed5ebcd77dc52b3a3b3d972"),
	"userId" : "U364xxx......",
	"type" : "user",
	"timestamp" : 1591077837810,
	"__v" : 0
}
```

