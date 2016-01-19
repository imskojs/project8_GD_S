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


module.exports = {

  areaBetween: function (x0, y0, x1, y1) {
    var result = Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)
    return result;
  }

};
