const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;
// TODO turn these off since we're using them in app (not sure if it will complain)
mongoose.Promise = global.Promise;

const passportLocalMongoose = require('passport-local-mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please provide an Email Address.',
  },
  name: {
    type: String,
    required: 'Please enter your name.',
    trim: true,
  },
});

/**
 * Register any plugins on schema
 */
// use email with local passportJS Mongoose strategu
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
// handle errors gracefully to the user
userSchema.plugin(mongodbErrorHandler);

// export our mongoose model instance
module.exports = mongoose.model('User', userSchema);
