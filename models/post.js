/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Post schema
 */

const PostSchema = new Schema({
  "userId": {
    "type": "Number"
  },
  "id": {
    "type": "Number"
  },
  "title": {
    "type": "String"
  },
  "body": {
    "type": "String"
  },
  "comments": {
    "type": [
      "Mixed"
    ]
  }
});
/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

PostSchema.method({});

/**
 * Statics
 */

PostSchema.static({});

/**
 * Register
 */

mongoose.model('Post', PostSchema);
