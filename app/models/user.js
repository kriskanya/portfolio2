'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
// var _ = require('lodash');
var bcrypt = require('bcrypt');

class User{

  static login(obj, fn){
    users.findOne({email:obj.email}, (e,u)=>{
      if(u){
        var isMatch = bcrypt.compareSync(obj.password, u.password);
        if(isMatch){
          fn(u);
        }else{
          fn(null);
        }
      }else{
        fn(null);
      }
    });
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (err, user)=>{
      fn(user);
    });
  }
}

module.exports = User; //exporting Class out
