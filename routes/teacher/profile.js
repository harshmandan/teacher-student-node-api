const express = require('express');
const Teacher = require('../../models/Teacher');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// const upload = multer({
//     dest: './uploads',
// });

const img_upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads')
        },
        filename: function (req, file, cb) {
          cb(null, 'img' + '-' + Date.now()+path.extname(file.originalname));
        }
    })
});


router.get('/', async function(req, res, next) {
    let user = await Teacher.findById(req.user._id).lean();
    res.json({user});
});

router.post('/update', async function(req, res, next) {
    if(req.body.name || req.body.email) {
        let data = {};
        if(req.body.name) data.name=req.body.name;
        if(req.body.email) data.email=req.body.email;
        await Teacher.findByIdAndUpdate(req.user._id, {...data});
        res.json({msg: 'Profile updated successfully'});
    } else res.status(400).send({msg: 'Send at least one field'});
});

router.post('/update_photo', img_upload.single('new_photo'), async function(req, res, next) {
    console.log(req.file);
    if(req.file) {
        await await Teacher.findByIdAndUpdate(req.user._id, {profile_photo: req.file.path});
        res.json({msg: 'Profile picture updated successfully'});
    } else {
        res.status(400).send({code:400});
    }
});

router.post('/update_single', img_upload.single('new_photo'), async function(req, res, next) {
    if(req.body.name || req.body.email || req.file) {
        data = {};
        if(req.body.name) data.name=req.body.name;
        if(req.body.email) data.email=req.body.email;
        if(req.file && req.file.path) data.profile_photo=req.file.path;
        await Teacher.findByIdAndUpdate(req.user._id, {...data});
        res.json({msg: 'Profile picture updated successfully'});
    }
});

module.exports=router;