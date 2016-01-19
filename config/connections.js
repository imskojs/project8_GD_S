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


/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html
 */

// Push service
var gcm = require('push-notify');

// Mail service
var nodemailer = require("nodemailer");

var smtpTransport = require('nodemailer-smtp-transport');


module.exports.connections = {

  someMongodbServer: {
    adapter: 'sails-mongo',
    url: "mongodb://localhost:27017/golfdic"
  },

  gcm: gcm.gcm({
    apiKey: 'googleKey'
  }),

  apnConfig: {
    "cert": __dirname + '/ssl/cert.pem',
    "key": __dirname + '/ssl/key.pem'
  },

  email: nodemailer.createTransport(smtpTransport({
    "host": "smtp.mandrillapp.com",
    "port": 587, // port for secure SMTP
    "secure": false,
    "auth": {
      "user": "developer@applicat.co.kr",
      "pass": "LYnyL4mY1At7NmpEZQs5vA"
    }
  })),

  //Dev
  cloudinary: {
    cloud_name: 'appdev',
    api_key: '355231636137138',
    api_secret: 'p_5ViDMlrlNZJFUP91trdUmo904',
    tags: ['APPLICAT', 'GOLFDIC']
  },

  //Production
  //cloudinary: {
  //  cloud_name: 'applicat',
  //  api_key: '992351679812158',
  //  api_secret: 'DHNaG-VHyUE8rVax4ay8YqbeQm8',
  //  tags: ['APPLICAT', 'SHOWPLA']
  //},

  /*
   *  User activate Service
   */

  activator: {
    from: "Applicatteam <applicatteam@applicat.co.kr>",
    url: {
      host: "smtp.mandrillapp.com",
      port: 2525,
      domain: "applicat.co.kr",
      secure: false,
      protocol: "SMTP",
      auth: {
        user: "applicatteam@applicat.co.kr",
        pass: "TGT5Zr4tZBQYXH37zJq_dg"
      }
    },
    templates: __dirname + "/../assets/mail_template/"
  }

};
