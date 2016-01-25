//====================================================
//  Sets createdBy, owner on req.body.
//  So My patch is to set it inside query:{}
//====================================================
'use strict';
module.exports = function OwnerPolicy(req, res, next) {
  // if no user from auth policy then reject
  if (!req.user || !req.user.id) {
    req.logout();
    return res.send(500, new Error('req.user is not set'));
  }
  // if model definition sets autoCreatedby false then pass
  if (req.options.modelDefinition.autoCreatedBy === false) {
    return next();
  }

  if ('POST' == req.method) {
    //req.body || (req.body = { });
    if (req.body.query) {
      req.body.query.updatedBy = req.user.id;
      req.body.query.createdBy = req.user.id;
      req.body.query.owner = req.user.id;
    } else {
      req.body.updatedBy = req.user.id;
      req.body.createdBy = req.user.id;
      req.body.owner = req.user.id;
    }
  }

  //sails.log.verbose('OwnerPolicy req.model', req.model);
  next();
};
