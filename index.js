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


app.get('/api/select-team/:teamid/:matchId', async(req, res)=>{
  
  const user = await User.findOne({user_name: req.params.teamid, matchId: req.params.matchId});

  console.log(req.params.id);
  
    if(!user)
    {
        res.send(null);
    }

    console.log(user);
    res.send(user); 
    

})

app.post('/api/select-team', async(req, res)=>{
  //console.log(req.body);

  const user = await User.findOne({user_name: req.body.user_name, matchId: req.body.matchId});

 // console.log(user.id)


  if(user)
  await User.deleteOne({_id: user._id},()=>{
    console.log('user removed');
  });

  User.create({
    user_name: req.body.user_name,
    Goalkeeper: req.body.Goalkeeper,
    Defender: req.body.Defender,
    Midfielder: req.body.Midfielder,
    Attacker: req.body.Attacker,
    captain: req.body.captain,
    viceCaptain: req.body.viceCaptain,
    matchId: req.body.matchId
  },(err, newlyCreated)=>{
    if(err)
    {
      console.log(err);
    }
    else{
      console.log('success');
      res.send('ok');
    }
  })
})


app.listen(1337,()=>{console.log("Listening");});