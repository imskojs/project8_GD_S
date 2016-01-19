/**
 * DeviceController
 *
 * @description :: Server-side logic for managing Devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  pushAll: pushAll,
  register: register,
  update: update
}

function pushAll(req, res) {

  var title = req.param("title");
  var message = req.param("message");

  if (!QueryService.checkParamPassed(title, message)) {
    res.send(400, {
      message: "Please pass all the parameters"
    });
    return;
  }

  Device.find({
      active: true
    })
    .exec(function (err, devices) {
      sails.log.debug(devices);
      if (err) {
        res.send(500, {
          message: "DB err."
        });
        return;
      }

      PushService.sendAll(devices, title, message);

      res.send(200, {
        message: "Message sent."
      });
      return;

    });

};

function register(req, res) {

  var device = req.allParams();

  sails.log.debug(JSON.stringify(device));

  if (!QueryService.checkParamPassed(device.deviceId, device.platform)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  Device.findOrCreate({
      deviceId: device.deviceId
    }, device)
    .then(function (createdDevice) {

      res.send(200, {
        device: createdDevice
      });
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "기기 등록을 실패 했습니다. 서버에러 code: 001"
      });

    });
};

function update(req, res) {

  var device = req.allParams();

  //device.owner = req.user.id;
  //device.updatedBy = req.user.id;

  sails.log.debug(JSON.stringify(device));

  if (!QueryService.checkParamPassed(device.deviceId)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  Device.update({
      deviceId: device.deviceId
    }, device)
    .then(function (updatedDevice) {
      res.send(200, {
        device: updatedDevice
      });
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "기기 업데이트를 실패 했습니다. 서버에러 code: 001"
      });
    })
}
