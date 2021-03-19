const express = require('express');
const Batch = require('../../models/Batch');
const BatchAdmission = require('../../models/BatchAdmission');
const Student = require('../../models/Student');
const router = express.Router();

router.get('/all', async function(req, res, next){
    let batches = await Batch.find({created_by:req.user._id, deleted: false}).lean();
    res.json({batches});
});

router.post('/create', async function(req, res, next){
    if(req.body.name) {
        let batch = await Batch.create({name: req.body.name, created_by: req.user._id});
        res.json({batch});
    } else res.status(400).send({msg:'send name'});
});

router.post('/delete', async function(req, res, next){
    if(req.body.batch_id) {
        await Batch.findByIdAndUpdate(req.body.batch_id, {deleted: true});
        // await Batch.findByIdAndDelete(req.body.batch_id); //permanently delete
        res.json({msg: 'Deleted succesfully'});
    } else res.status(400).send({msg:'send name'});
});

router.get('/students', async function(req, res, next){
    let students = await Student.find({}).lean();
    res.json({students});
});

router.post('/admission', async function(req, res, next){
    if(req.body.batch_id && req.body.student_id) {
        let admission = await BatchAdmission.create({student_id: req.body.student_id, batch_id:req.body.batch_id});
        res.json({admission});
    } else res.status(400).send({msg:'send all parameters'});
});

module.exports=router;