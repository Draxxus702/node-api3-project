const express = require('express');

const User = require('./userDb.js')

const Post = require('../posts/postDb.js')

const router = express.Router();

router.use('/:id', validateUserId)

router.post('/', validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
  .then(param =>{
    res.status(201).json(param)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({errorMessage:'Oops'})
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  const postId = req.params.id
  const postInfo = {...req.body, user_id:postId}

  Post.insert(postInfo)
  .then(param => {
    console.log(param)
    res.status(201).json(param)
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({errorMessage: 'oops'})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
  .then(param =>{
    res.status(200).json(param)
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
      errorMessage:"Could not find your information"
    })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  User.getUserPosts(req.params.id)
    .then(param =>{
      res.status(200).json(param)
    })
    .catch(err =>{
      res.status(500).json({
        errorMessage:'This is an error'
      })
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  User.remove(req.params.id)
  .then(param =>{
    res.status(200).json({message: `user successfully deleted `,
                             user: req.user
  })
  })
  .catch(err =>{
    res.status(500).json({
      errorMessage: 'Did not delete'
    })
  })
});

router.put('/:id', validateUser, (req, res) => {
  // do your magic!
  const id = req.params.id

  User.update(id, req.body)
  .then(param =>{
    res.status(200).json({message:'successfully changed data',
    user: req.user
  })
  })
  .catch(err =>{
    res.status(500).json({errorMessage: 'could not change'})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id
  User.getById(id)
  .then(param =>{
    if(!param){
      res.status(400).json({
        errorMessage: 'The user doesnt exist'
      })
    }else{
      req.user = param
      next()
    }
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
      errorMessage:'couldnt validate'
    })
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({errorMessage:'missing user data'})
  }else{
    if(!req.body.name){
      res.status(400).json({errorMessage:'Missing required name field'})
    }else{
      next()
    }
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({
      errorMessage:'missing post data'
    })
  }else{
    if(!req.body.text){
      res.status(400).json({
        errorMessage:'missing required text field'
      })
    }else{
      next()
    }
  }
}

module.exports = router;
