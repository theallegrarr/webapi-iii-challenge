const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  res.json(req.user);
});

router.post('/:id/posts', validatePost, (req, res) => {
  res.json(req.userposts);
});

router.get('/', (req, res) => {
  users.get()
       .then(users => res.json(users))
       .catch(error => {
         console.log(error)
         res.status(400).json({ message: 'Error occured while fetching users' });
        })
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
  users.getById(req.params.id)
       .then(user => {
         if(user) {
          req.user=user;
          next();
         }
         res.status(400).json({ message: 'User id is not valid' });
       }).catch(error => {
         console.log(error);
         res.status(400).json({ message: 'Error fetching user' });
       })
};

function validateUser(req, res, next) {
  if(!req.body.name)res.status(400).json({ message: 'User missing required fields' });
    users.insert(req.body)
        .then(user => {
          if(user) {
            req.user=user;
            next();
          }
          res.status(400).json({ message: 'User id is not valid' });
        }).catch(error => {
          console.log(error);
          res.status(400).json({ message: 'Error adding user valid' });
        })
};

function validatePost(req, res, next) {
  if(!req.body)res.status(400).json({ message: 'missing post data' });
  if(!req.body.text)res.status(400).json({ message: 'missing required text field' });
    req.body.user_id = req.params.id;
    posts.insert(req.body)
        .then(postdata => {
          if(postdata) {
            req.userposts=postdata;
            next();
          }
        }).catch(error => {
          console.log(error);
          res.status(400).json({ message: 'Error adding new post' });
        })
};

module.exports = router;
