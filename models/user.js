const mongoose = require('mongoose');
const validator = require('validator');

function validateEmail(email) {
  return validator.isEmail(email);
}

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validateEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    required: true,
    type: String,
  },
});

module.exports.userModel = mongoose.model('user', userSchema);
