/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var Portfolio = traceur.require(__dirname + '/../models/portfolio.js');
var multiparty = require('multiparty');
var Mongo = require('mongodb');

exports.index = (req, res)=>{
  res.render('portfolios/index', {title: 'Works'});
};

exports.new = (req, res)=>{
  res.render('portfolios/new', {title: 'Add Project'});
};

exports.create = (req, res)=>{
  var form = new multiparty.Form();
  var userId = req.session.userId;

  form.parse(req, (err, fields, files)=>{
    Portfolio.create(userId, fields, files, (portfolioId)=>{
      res.redirect(`/portfolio/show/${portfolioId}`);
    });
  });
};

exports.show = (req, res)=>{
  var portId = Mongo.ObjectID(req.params.portId);
  Portfolio.findById(portId, port=>{
    res.render('portfolios/show', {port:port, title:`${port.title}`});
  });
};
