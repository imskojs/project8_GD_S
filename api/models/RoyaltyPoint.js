/**
 * Created by Andy on 7/10/2015
 * As part of applicatplatform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 7/10/2015
 *
 */

module.exports = {
    schema: false,
    attributes: {

        // Properties
        points: {type: 'FLOAT'},

        // Associations
        place: {model: 'Place'},

        owner: {model: 'User'},
        createdBy: {model: 'User'},
        updatedBy: {model: 'User'}

    }
}
