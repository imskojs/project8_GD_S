/**
 * Created by andy on 26/05/15
 * As part of beigintongserver
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 26/05/15
 *
 */




/*******************************************************************************
 * MyFitMate
 *
 * Mail Service
 *
 ******************************************************************************/

var async = require('async');
var smtp = require('activator').smtp();
var transport, from, templates, mailer;

module.exports = {


  init: function () {

    transport = sails.config.connections.email;
    from = "Applicatteam <applicatteam@applicat.co.kr>";
    templates = __dirname + "/../../assets/mail_template/";
    mailer = smtp(transport, templates);

  },


  sendEmail: function (template, lang, data, from, to, callback) {

    mailer(template, lang || "kr", data, from, to, callback);

  }
};
