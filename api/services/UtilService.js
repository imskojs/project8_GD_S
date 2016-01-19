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


// Util Service

var jwt = require('jsonwebtoken');


module.exports = {

    // Token
    getToken: function (userinfo) {

        var secret = sails.config.session.secret;
        var token = jwt.sign(userinfo, secret, {'expiresIn': "365 days"});

        return token;
    },

    verifyToken: function (token, callback) {
        var secret = sails.config.session.secret;
        jwt.verify(token, secret, callback);
    },

    userInfoParser: function (provider, data) {


        var user = {
            username: data.id
        };

        switch (provider) {
            case 'kakao':
                user = _.extend(user, data.properties);
                break;
            case 'facebook':
                user.firstname = data.first_name;
                user.lastname = data.last_name;
                user.nickname = data.name;
                user.email = data.email;
                user.profile_image = 'http://graph.facebook.com/' + data.id + '/picture';
                break;
        }

        return user;
    }
};
