/* jshint unused:false */

'use strict';

var portfolios = global.nss.db.collection('portfolios');
var moment = require('moment');
var fs = require('fs');
// var Mongo = require('mongodb');
// var _ = require('lodash');


class Portfolio{
  constructor(obj){
    this.title = obj.title;
    this.userId = obj.userId;
    this.description = obj.description;
    this.git = obj.git;
    this.appLink = obj.app;
    this.date = obj.date;
    this.tags = obj.tags;
    this.photos = obj.photoPaths;
  }

  save(fn){
    portfolios.save(this, ()=>{
      fn();
    });
  }

  static create(userId, fields, files, fn){
    var obj = {};
    obj.title = fields.title[0];
    obj.userId = userId;
    obj.description = fields.description[0];
    obj.git = fields.git[0];
    obj.app = fields.app[0];
    obj.date = moment(fields.date[0]).format('MMMM Do YYYY');
    obj.tags = fields.tags[0];
    obj.photoPaths = [];
    var photoTitles = [];
    var photoOrigPaths = [];
    files.photo.map(photo=>{
      obj.photoPaths.push(`/img/${userId}/${obj.title}/${photo.originalFilename}`);
      photoOrigPaths.push(photo.path);
    });


    if(obj.photoPaths.length > 0){
      if(!fs.existsSync(`${__dirname}/../static/img/${userId}`)){
        fs.mkdirSync(`${__dirname}/../static/img/${userId}`);
      }
      if(!fs.existsSync(`${__dirname}/../static/img/${userId}/${obj.title}`)){
        fs.mkdirSync(`${__dirname}/../static/img/${userId}/${obj.title}`);
      }

      obj.photoPaths.forEach((path, i)=>{
        fs.renameSync(photoOrigPaths[i], `${__dirname}/../static/${path}`);
      });
    }

    var portfolio = new Portfolio(obj);
    portfolio.save(()=>{
      fn(portfolio._id);
    });
  }

  // processPhotos(photos){
  //   photos.forEach((p,i)=>{
  //     var title = this.title.toLowerCase().replace(/[^\w]/g, '');
  //     var photo = `/img/${this.userId}/${title}/${i}${path.extname(p.originalFilename)}`;
  //     this.photos.push(photo);
  //
  //     var userDir = `${__dirname}/../static/img/${this.userId}`;
  //     var projDir = `${userDir}/${title}`;
  //     var fullDir = `${projDir}/${i}${path.extname(p.originalFilename)}`;
  //
  //     if(!fs.existsSync);
  //
  //     fs.renameSync(p.path, fullDir);
  //   });
  // }

  static findById(portId, fn){
    portfolios.findOne(portId, (err, port)=>{
      fn(port);
    });
  }

}

module.exports = Portfolio; //exporting Class out
