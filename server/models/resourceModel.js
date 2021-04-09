const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    link: { type: String, required: true },
    teamId: { type: String, required: true },
    votes: { type: Number, default: 0 },
    category: { type: String, required: true }
}, { timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = { Resource };