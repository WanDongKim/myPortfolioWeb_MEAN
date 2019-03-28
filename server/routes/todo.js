    // Created a router todo.js 
    // FIle name: todo.js
    // Name: Dongwan Kim
    // Student id: 300932262
    // Last modified: Mar 26th, 2019

let express = require('express');
let router = express.Router();

let jwt = require('jsonwebtoken');

let passport = require('passport');

let todoController = require('../controllers/todo');

    router.get('/', passport.authenticate('jwt', {session: false}), todoController.displayTodoList);
/* GET Route for the Add page 
   this will display the Add page */
   router.get('/add', passport.authenticate('jwt', {session: false}), todoController.displayAddPage);

   /* POST Route for processing the Add page */
   router.post('/add', passport.authenticate('jwt', {session: false}), todoController.processAddPage);
   
   /* GET request - display the Edit page */
   router.get('/edit/:id', passport.authenticate('jwt', {session: false}), todoController.displayEditPage);
   
   /* POST request - Update the database with data from the Edit Page */
   router.post('/edit/:id', passport.authenticate('jwt', {session: false}), todoController.processEditPage);
   
   /* GET request to perform the delete action */
   router.get('/delete/:id', passport.authenticate('jwt', {session: false}), todoController.performDelete);
   
   module.exports = router;