const mongoose = require('mongoose');

var BatchAdmissionSchema = new mongoose.Schema({
    batch_id: {type: mongoose.Schema.Types.ObjectId , ref: 'Batch', required: true},
    student_id: {type: mongoose.Schema.Types.ObjectId , ref: 'Student', required: true},
    created_at: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('BatchAdmission', BatchAdmissionSchema);