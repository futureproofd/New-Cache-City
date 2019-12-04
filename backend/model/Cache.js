const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const validator = require('validator');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const mongodbErrorHandler = require('mongoose-mongodb-errors');

const cacheSchema = new Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isAscii, 'Invalid Cache name'],
    required: 'Please provide a name for this Cache',
  },
  description: {
    type: String,
    unique: false,
    validate: [validator.isAscii, 'Invalid characters'],
    required: 'Please provide a description of the Cache',
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [
      {
        type: Number,
        required: 'Coordinates required for Cache',
      },
    ],
    address: {
      type: String,
      required: 'You must supply a general location',
    },
  },
  photo: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'User required',
  },
});

cacheSchema.plugin(mongodbErrorHandler);
cacheSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Cache', cacheSchema);
