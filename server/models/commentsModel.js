const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// userId and resourceId will match respective id from user and resource
const commentsSchema = new Schema({
  text: { type: String, required: true},
  userId: {type: String, required: true},
  resourceId: {type: String, required: true}
}, {timestamps: true})

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = {Comments}