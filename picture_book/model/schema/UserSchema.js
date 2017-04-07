var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var UserSchema = new Schema({
    email: { type: 'String', unique: true, required: true, dropDups: true },
    password: { type: 'String', required: true },
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    status: { type: 'Number', default: 1 }, //1 - active, 0-inactive
    accessToken: { type: 'String', default: 0 },
    createdAt: { type: "Number", default: new Date().getTime() },
    updatedAt: { type: "Number", default: new Date().getTime() }
});

UserSchema.method("formattedUser", function() {
    return {
        id: this._id,
        email: this.email,
        status: this.status,
        firstName: this.firstName,
        lastName: this.lastName,
        accessToken: this.accessToken,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
});

UserSchema.method("authenticate", function(email, password, cb) {
    var query = userSchemaObj.where({ email: email });
    query.findOne(function(err, thisUser) {
        if (err) {
            return cb(err);
        }
        if (thisUser) {
            var bPassMatch = false;
            if (crypto.createHash('md5').update(password).digest("hex") === thisUser.password) {
                cb(null, thisUser.formattedUser());
            } else {
                cb("Invalid username or password");
            }
        } else {
            cb("User does not exist");
        }

    });
});
userSchemaObj = mongoose.model('userList', UserSchema);;
module.exports = userSchemaObj;
