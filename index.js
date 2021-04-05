const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var User = require('./models/user');
const Contest = require('./models/contest');
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

  //console.log(req.params.id);
  
    if(!user)
    {
        res.send(null);
    }

   // console.log(user);
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

app.get('/api/bet' ,async(req, res)=>{


  const contest = await Contest.find();

 // console.log(contest);

  if(contest) res.send(contest);

  else res.send(null);

})

app.get('/api/bet/:matchId' ,async(req, res)=>{


  const contest = await Contest.findOne({matchId: req.params.matchId});

 // console.log(contest);

  if(contest) res.send(contest);

  else res.send(null);

})

app.post('/api/update-pts/:user_name/:matchId', async(req, res)=>{
  
  //console.log(req.body.Goalkeeper_new);
 await User.findOneAndUpdate({user_name: req.body.user_name, matchId: req.body.matchId},
   { Goalkeeper: req.body.Goalkeeper_new,
      Defender: req.body.Defender_new,
      Midfielder: req.body.Midfielder_new,
      Attacker: req.body.Attacker_new,
      points: req.body.total_points
    }).catch((err)=>{
      console.log(err);
    });
   // const user = await User.findOne({user_name: req.params.user_name, matchId: req.params.matchId});
   // console.log(user.Goalkeeper);
   console.log("done")
  return res.json({staus : 'ok'}); 
})


app.get('/api/get-opponent/:matchId/:user_name', async(req, res)=>{

  const user = await User.findOne({user_name: {$ne: req.params.user_name}, matchId: req.params.matchId});

 // opponent = opponent.json();

 // console.log( user);

  res.send(user);
 
})

app.post('/api/bet', async(req, res)=>{
  
  const contest = await Contest.findOne({ matchId: req.body.matchId});

 // console.log("here");

  if(contest)
  {
   await Contest.updateOne({ matchId: req.body.matchId }, {user2: req.body.user_name});
   console.log("updated");
  }
  else{
   await Contest.create({
      matchId: req.body.matchId,
      user1: req.body.user_name
    }, (err, newlyCreated)=>{
      if(err)
      {
        console.log(err);
      }
      else{
        console.log('match created');
        res.send('ok');
      }
    })
  }

})

app.listen(1337,()=>{console.log("Listening");});