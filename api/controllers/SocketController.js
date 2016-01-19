/**
 * Created by andy on 18/12/15
 * As part of ServerBase
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 18/12/15
 *
 */

module.exports = {
  subscribeToRoom: subscribeToRoom,
  getMyRooms: getMyRooms,
}

function subscribeToRoom(req, res) {
  var roomName = req.param('roomName');

  sails.log(roomName);

  sails.sockets.join(req.socket, roomName);

  res.json({
    message: 'Subscribed to a fun room called ' + roomName + '!'
  });
}

function getMyRooms(req, res) {
  var roomNames = JSON.stringify(sails.sockets.socketRooms(req.socket));
  res.json({
    message: 'I am subscribed to: ' + roomNames
  });
}
