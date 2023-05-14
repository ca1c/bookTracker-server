require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
var cors = require('cors')
const app = express();
const router = require('./router/controller');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL + 'bookdb');
}

// NewBook.save();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

var sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60*60*1000 },
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    autoRemove: 'interval',
    autoRemoveInterval: 10 // In minutes. Default
  })
};

// parse application/json
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(helmet());
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})
app.use(bodyParser.json());
app.use(session(sess));
app.use(cors());
app.use(router);




const PORT = 3000;

app.listen(process.env.PORT || PORT);