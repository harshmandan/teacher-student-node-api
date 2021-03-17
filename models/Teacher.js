const mongoose = require('mongoose');

var TeacherSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    profile_photo: {type: String},
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now()},
})

module.exports = mongoose.model('Teacher', TeacherSchema);