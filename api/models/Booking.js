/**
 * Created by Andy on 7/6/2015
 * As part of applicatplatform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 7/6/2015
 *
 */


var moment = require('moment');

module.exports = {
    schema: false,
    attributes: {

        // Properties
        category: {type: 'STRING', index: true},
        datetime: {type: 'DATETIME'},
        duration: {type: 'FLOAT'},
        status: {type: 'STRING'},

        // e.g. [array of products as snapshot]
        products: {type: 'ARRAY'},

        // Associations
        place: {model: 'Place'},
        owner: {model: 'User'},
        createdBy: {model: 'User'},
        updatedBy: {model: 'User'}

    }
}
