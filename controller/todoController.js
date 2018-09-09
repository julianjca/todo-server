const Todo = require('../models/todoModel');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'qerjaworkspace@gmail.com',
      pass: process.env.GMAIL_PASS
  }
});

module.exports = {
  addTask : function(req,res){
    console.log(req.body);
    Todo.create({
      name : req.body.name,
      dueDate : req.body.dueDate,
      description : req.body.description
    })
    .then(data=>{
      //Verifying Token
      jwt.verify(req.body.token,process.env.JWT_SECRET,(err,decoded)=>{
        User.updateOne({ email: decoded.email },
          { $push: { todolist: new mongodb.ObjectId(data._id) } }
          )
          .then(data=>{
            const mailOptions = {
              from: '"Todolist"', // sender address
              to: decoded.email, // list of receivers
              subject: `Hello,`, // Subject line
              text: 'Hello world?', // plain text body
              html: `<h1 style="
              border-bottom : 1px black solid;
              ">You Have A New Todo</h1>
                <h2>Name = ${req.body.name}</h2>
                <h2>Description = ${req.body.description}</h2>
                <h2>Due Date = ${req.body.dueDate}</h2>
              `
          };
              transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.status(500).json({
                  error
                });
              } else {
                res.status(201).json({
                  data
                });
              }
              });
          })
          .catch(err=>{
            res.status(500).json({
              err
            });
          });
      });

    })
    .catch(err=>{
      res.status(500).json({
        err
      });
    });
  },

  deleteTask : function(req,res){
    Todo.deleteOne({_id: new mongodb.ObjectID(req.params.id)},(err)=>{
      if(!err){
        console.log(`Removed the document with the id a equal to ${req.params.id}`);
        res.status(200).json({
          msg : `success deleting with id : ${req.params.id}`
        });
      }
      else{
        res.status(500).json({
          msg : "failed deleting from database"
        });
      }
    });
  },

  updateTask : function(req,res){
    const data = req.body;
    Todo.updateOne({_id: new mongodb.ObjectID(req.params.id)},data,(err)=>{
      if(!err){
        res.status(200).json({
          msg : `Updated the document with the id a equal to ${req.params.id}`,
        });
      }
      else{
        res.status(500).json({
          msg : "failed updating to database"
        });
      }
    });
  },

  finishTask : function(req,res){
    Todo.updateOne({_id: new mongodb.ObjectID(req.params.id)},{status : "Finished"},(err)=>{
      if(!err){
        res.status(200).json({
          msg : `Updated the document with the id a equal to ${req.params.id}`,
        });
      }
      else{
        res.status(500).json({
          msg : "failed updating to database"
        });
      }
    });
  }
};