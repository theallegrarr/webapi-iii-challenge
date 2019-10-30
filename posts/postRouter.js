const express = require('express');
const posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  
});

router.get('/:id', validatePostId, (req, res) => {
  res.json(req.post);
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
  posts.getById(req.params.id)
       .then(post => {
          if(!post)res.status(404).json({ message: 'Post not found'});
          req.post=post;
          next();
        }).catch(err => {
          console.log(err);
          res.status(400).json({ message: 'Error finding post' });
        })
};

module.exports = router;