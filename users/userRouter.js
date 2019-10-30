const express = 'express';
const users = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {

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
         }
         res.status(400).json({ message: 'User id is not valid' });
       }).catch(error => {
         console.log(error);
       })
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
