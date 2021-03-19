const express = require('express');
const Batch = require('../../models/Batch');
const BatchAdmission = require('../../models/BatchAdmission');
const router = express.Router();

router.get('/all', async function(req, res, next) {
    let enrollments = await BatchAdmission.find({student_id: req.user._id}).lean();
    //find the enrollments
    let batch_ids = enrollments.map(o=>o.batch_id);
    //get the array of batchids
    let batches = await Batch.find({_id: {$in: batch_ids}}).lean();
    //get the batches from the array of batchids
    res.json({batches});
});

module.exports=router;