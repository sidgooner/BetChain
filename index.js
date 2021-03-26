const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var User = require('./models/user');
const app = express();

require("dotenv").config();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
mongoose.connect("mongodb+srv://sidgooner:CC4hcoWHcwSI70mc@cluster0.qfcoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('Connected to DB1!'))
.catch(error => console.log(error.message));


if(process.env.NODE_ENV !== 'production')
{
    app.use(cors());
}




app.get('/', (req, res)=>{
    res.send('hi');
});

app.post('/api/select-team', async(req, res)=>{
  console.log(req.body);
})


app.listen(1337,()=>{console.log("Listening");});