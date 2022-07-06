const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

var User = (module.exports = mongoose.model("User", UserSchema));

//CREATE ADMIN ACCOUNT
var adminUser = new User({
  username: "admin",
  password: "admin",
});

function createUser(newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      // store hash
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
module.exports.createUser = createUser;

module.exports.getUserByUsername = function (username, callback) {
  User.findOne(
    {
      username: username,
    },
    callback,
  );
};

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) {
      throw err;
    }
    callback(null, isMatch);
  });
};