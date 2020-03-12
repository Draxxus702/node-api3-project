const express = require('express');

const Post = require('./postDb.js')

const User = require('../users/userDb.js')

const router = express.Router();

router.use('/:id', validatePostId)

router.get('/', (req, res) => {
  // do your magic!
  Post.get()
  .then(param =>{
    res.status(200).json(param)
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({errorMessage:"This is an error"})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  res.status(200).json(req.post)
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Post.remove(req.params.id)
  .then(param =>{
    res.status(200).json({message: `post successfully deleted`,
                              post: req.post})
  })
  .catch(err =>{
    res.status(500).json({errorMessage:'could not delete'})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  const body = req.body
  Post.update(id, body)
  .then(param =>{
    res.status(200).json({message: 'Successfully changed post',
                              Post: req.post})
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({errorMessage: 'Could not change post'})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id
  Post.getById(id)
  .then(param =>{
    if(!param){
      res.status(400).json({
        errorMessage: 'The user doesnt exist'
      })
    }else{
      req.post = param
      next()
    }
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
      errorMessage:'Oops'
    })
  })
}


module.exports = router;
