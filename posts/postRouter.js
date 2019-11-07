const express = require('express');
const posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  posts.get()
       .then(post => {
          if(!post)res.status(200).json({ message: 'No Posts found'});
          res.status(200).json(post);
        }).catch(err => {
          console.log(err);
          res.status(400).json({ message: 'Error finding posts' });
        })
});

router.get('/:id', validatePostId, (req, res) => {
  res.json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  posts.remove(req.params.id)
       .then(post => {
          res.status(200).json({ message: `post ${req.params.id} deleted`});
        }).catch(err => {
          console.log(err);
          res.status(400).json({ message: 'Error deleting posts' });
        })
});

router.put('/:id', validatePostId, (req, res) => {
  posts.update(req.params.id, req.body)
       .then(post => {
          res.status(200).json(post);
        }).catch(err => {
          console.log(err);
          res.status(400).json({ message: 'Error updating post' });
        })
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