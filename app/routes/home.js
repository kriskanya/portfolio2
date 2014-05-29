'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Nathan Hood: Portfolio'});
};

exports.about = (req, res)=>{
  res.render('home/about', {title: 'Nathan Hood: About'});
};

exports.faq = (req, res)=>{
  res.render('home/faq', {title: 'Nathan Hood: FAQ'});
};

exports.contact = (req, res)=>{
  res.render('home/contact', {title: 'Nathan Hood: Contact'});
};

exports.resume = (req, res)=>{
  res.render('home/resume', {title: 'Nathan Hood: resume'});
};

exports.help = (req, res)=>{
  res.render('home/help', {title: 'Nathan Hood: Help'});
};
