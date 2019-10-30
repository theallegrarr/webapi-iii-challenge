const express = require('express');
const users = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  res.json(req.user);
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

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

};

module.exports = router;
