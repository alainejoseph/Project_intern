var express = require('express');
var router = express.Router();
const User = require('../Models/User')
const Group = require('../Models/Group')
const auth = require('../middleWare/authMid')

const { createSecretToken } = require("../util/secretToken");


/* GET home page. */
router.post('/',auth.verifyUser);


router.post('/signup',async (req,res)=>{
console.log(req.body)
const newUser = new User(req.body)
const saveUser = await newUser.save()
req.session.user = saveUser;
res.status(201).json({ message: "User logged in successfully", success: true });
})


router.post('/login', async (req, res) => {
  console.log(req.body)
  const user = await User.findOne({email:req.body.email})
  // Simulate login logic
  if (user) {
    if(user.pass==req.body.pass){
    req.session.user = user;
    res.json({ message: 'Logged in' ,user:user});
    }else{
      res.status(400).json({ message: 'incorrect password' });
    }
  } else {
    res.status(400).json({ message: 'Missing user' });
  }



});

router.get('/logout',(req,res)=>{
try {
    if (req.session) {
      req.session.destroy()
      res.cookie('connect.sid','none',{expires: new Date()+1000})
      res.json({status:true})
    }
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ status: false });
  }
});

router.post('/creategroup', async (req,res)=>{
  console.log(req.body)
  const group = {...req.body,createdAt: new Date().toLocaleString()}
  const newGroup = new Group(group)
  const save = newGroup.save()
  res.json({status:true})
})

router.get('/getgroups', async (req,res)=>{
  let groups = await Group.find()
  res.json({group:groups})
})

router.post('/joingroup/:id', async (req,res)=>{
  try{
  let group = await Group.findById(req.params.id)
  group.members.push(req.body.user)
  const saveGroup = await group.save()
  res.json({status:true})
  }catch(err){
    console.log(err)
    res.json({status:false})
  }
})

router.get('/getgroup/:id', async (req,res)=>{
  try{
  let group = await Group.findById(req.params.id)

  res.json({status:true,group})
  }catch(err){
    res.json({status:false})
  }
})

router.get('/me', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    res.cookie('connect.sid', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000), // expires in 10ms
    }); // default session cookie name
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
