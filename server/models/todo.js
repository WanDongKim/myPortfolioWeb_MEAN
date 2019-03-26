    // Created todo model 
    // FIle name: todo.js
    // Name: Dongwan Kim
    // Student id: 300932262
    // Last modified: Mar 26th, 2019

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let todoSchema = mongoose.Schema({
        name:{
            type: String,
            default: "",
            trim: true,
            require: "name is required"
        },
        description:{
            type: String,
            default: ""
        },
        finishBy: {
            type: Date,
            default: Date.UTC(2099,11,30)
        },
        created: {
            type: Date,
            default: Date.now
        }
    },{
        collection: "todoList"
    });

module.exports = mongoose.model('todo',todoSchema);