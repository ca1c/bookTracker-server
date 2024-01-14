# myBook Server

Created with `express.js` and `mongoose`.

Hosted with Heroku.

### Setup:

1. Install dependencies

`$ npm install`

2. Set up environment variables

*The email is the account used to send confirmation and password change emails etc.*

```
SECRET=serversecret
DB_URL=mongodb://127.0.0.1:27017/
LOCAL_API_URL=http://localhost:4001/
MAIL_USER=*put email here*
MAIL_PASS=*put email password here*
CLIENT_URL=http://localhost:8080/
```

3. Run mongo instance

`$ mongod`

4. Create mongo database

`$ mongo`

`$ use bookdb`

5. Run the server

`$ npm run dev`

This server will now be running at `http://localhost:4000`