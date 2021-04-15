const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    image: { type: String },
    name: { type: String, required: true, unique: true },
    category: { type: String, required: false },
    description: { type: String },
    userCount: { type: Number },
    resourceCount: { type: Number },
}, { timestamps: true });

var Team = mongoose.model('Team', teamSchema);

module.exports = { Team };