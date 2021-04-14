const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    link: { type: String, required: true },
    teamId: { type: String, required: true },
    votes: { type: Number, default: 0 },
    category: { type: String, required: true },
    title: { type: String, required: false },
    img: { type: String, required: false },
    description: { type: String, required: false },
}, { timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = { Resource };