// Created controller todo.js 
// FIle name: todo.js
// Name: Dongwan Kim
// Student id: 300932262
// Last modified: Mar 26th, 2019

let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

// Crete a reference to the db schema
let todoModel = require('../models/todo');

// GET todo
module.exports.displayTodoList = (req, res, next) => {
    todoModel.find((err, todoList) => {
        if(err) {
            return console.error(err);
        }else{
            res.json({success: true, msg: 'Todo List Rendered Successfully', todoList: todoList, user: req.user});
        }
    });
}

// GET todo/add
module.exports.displayAddPage = (req, res, next) => {
    return res.json({success: true, msg: 'Successfully Displayed Add Page'});
}

//POST todo/add
module.exports.processAddPage = (req, res, next) => {
    let newTodo = todoModel({
        "name": req.body.name,
        "description": req.body.description,
        "finishBy": req.body.finishBy
    });

    todoModel.create(newTodo, (err, todoModel) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            return res.json({success: true, msg: 'Successfully Added New TodoItem'});
        }
    });
}

//GET todo/edit/:id
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    todoModel.findById(id, (err, todoItem) => {
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.json({success: true, msg: 'Successfully Displayed TodoItem to Edit', todo: todoItem});
        }
    });
}

//POST todo/edit/:id
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedTodoItem = todoModel({
        "_id": id,
        "name": req.body.name,
        "description": req.body.description,
        "finishBy": req.body.finishBy
    });

    todoModel.update({_id: id}, updatedTodoItem, (err) => {
        res.json({success: true, msg: 'Sucessfully Edited TodoItem', todo: updatedTodoItem});
    })
}

// POST todo/delete/:id
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    todoModel.remove({_id:id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.json({success: true, msg: 'Sucessfully Deleted TodoItem'});
        }
    })
}