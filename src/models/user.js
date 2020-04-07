/* eslint-disable func-names */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is not an email`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

// validation for patch routes
userSchema.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true;
  next();
});

// finding user on login route
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return false;
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return false;
          }
          return user;
        });
    });
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
