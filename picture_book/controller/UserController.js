var express = require('express'),
    apiResponse = require('../utils/Response'),
    userSchema = require('../model/schema/UserSchema'),
    UserController = {};

UserController.signUp = function(userVo, callbk) {
    userSchema.create(userVo, function(err, thisuser) {
        if (err) {
            callbk(apiResponse.error(err));
        }
        callbk(apiResponse.success(thisuser))
    });
};

UserController.login = function(userVo, callbk) {
    if (userVo && userVo.email && userVo.password) {
        var thisUser = new userSchema();
        thisUser.authenticate(userVo.email, userVo.password, function(err, data) {
            if (err) {
                apiResponse.error({ errmsg: 'Invalid username or password' })
                callbk(apiResponse.error(err));
            } else {
                callbk(apiResponse.success(data));
            }
        })
    } else {
        callbk(apiResponse.error({ errmsg: 'email and password required' }));
    }
}

module.exports = UserController;
