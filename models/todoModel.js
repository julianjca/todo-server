const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name:{
        type: String
    },
    dueDate:{
        type: Date
    },
    description : {
        type : String
    },
    status : {
        type : String,
        default : "Unfinished"
    }
},{
    timestamps: true
});

const User = mongoose.model('Todo', todoSchema);
module.exports = User;