var express = require('express'),
    apiResponse = require('../utils/Response'),
    userSchema = require('../model/schema/UserSchema'),
    crypto = require('crypto');
UserController = {};

UserController.signUp = function(userVo, callbk) {
    var thisUser = new userSchema();
    thisUser.authenticate(userVo.email, '', function(err, data) {
        if (err === 'User does not exist') {
            userVo.password = crypto.createHash('md5').update(userVo.password).digest("hex");
            userSchema.create(userVo, function(err, thisuser) {
                if (err) {
                    callbk(apiResponse.error(err));
                }
                callbk(apiResponse.success(thisuser))
            });
        } else {
            callbk(apiResponse.error(err));
        }
    })
};

UserController.login = function(userVo, callbk) {
    if (userVo && userVo.email && userVo.password) {
        var thisUser = new userSchema();
        thisUser.authenticate(userVo.email, userVo.password, function(err, data) {
            if (err) {
                callbk(apiResponse.error(err));
            } else {
                callbk(apiResponse.success(data));
            }
        })
    } else {
        callbk(apiResponse.error({ errmsg: 'Email and Password required' }));
    }
}

module.exports = UserController;
