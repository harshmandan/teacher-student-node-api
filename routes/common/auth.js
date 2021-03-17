const express = require('express');
const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../credentials/config');
const router = express.Router();

async function findTeacher(email) {
    try {
        let teacher = await Teacher.findOne({email}).lean();
        if(teacher) {
            return {err: false, found: true, teacher};
        } else {
            return {err: true, found: false, error:'Invalid email'}
        }
    } catch(e) {
        return {err:true, error: e};
    }
}

async function findStudent(email) {
    try {
        let student = await Student.findOne({email}).lean();
        if(student) {
            return {err: false, found: true, student};
        } else {
            return {err: true, found: false, error:'Invalid email'}
        }
    } catch(e) {
        return {err:true, error: e};
    }
}

router.post('/login', findTeacher(req, res), async function(req, res, next) {
    if(req.body.email && req.body.password && req.body.method && req.body.method=="teacher") {
        let teacher = await findTeacher(req.body.email);
        if(teacher.err || !teacher.found) {
            return res.status(400).send({error: teacher.error});
        } else {
            let result = bcrypt.compare(req.body.password, teacher.password);
            if(result) {
                let token = jwt.sign({_id: teacher._id, user_type:'teacher'}, config.jwt_secret_key);
                res.json({teacher, token});
            } else {
                return res.status(400).send({error: 'Invalid password'});
            }
        }
    } else if(req.body.email && req.body.password && req.body.method && req.body.method=="student") {
        let student = await findStudent(req.body.email);
        if(student.err) {
            return res.status(400).send({error: student.error});
        } else {
            let result = bcrypt.compare(req.body.password, student.password);
            if(result) {
                let token = jwt.sign({_id: student._id, user_type:'student'}, config.jwt_secret_key);
                res.json({student, token});
            } else {
                return res.status(400).send({error: 'Invalid password'});
            }
        }
    } else {
        return res.status(400).send({error: 'Invalid/Not enough paramters'});
    }
});

router.post('/signup', function(req, res, next) {
    if(req.body.email && req.body.password && req.body.name && req.body.method && req.body.method=="teacher") {
        let teacher = await findTeacher(req.body.email);
        if(teacher.err) {
            return res.status(400).send({error: teacher.error});
        } else if(teacher.found) {
            return res.status(400).send({error: 'Email already exists'});
        } else {
            let hash = bcrypt.hash(req.body.password);
            let new_teacher = await Teacher.create({email: req.body.email, password: hash, name: req.body.name});
            let token = jwt.sign({_id: new_teacher._id, user_type:'teacher'}, config.jwt_secret_key);
            res.json({teacher: new_teacher, token});
        }
    } else if(req.body.email && req.body.password && req.body.name && req.body.method && req.body.method=="student") {
        let student = await findStudent(req.body.email);
        if(student.err) {
            return res.status(400).send({error: student.error});
        } else if(student.found) {
            return res.status(400).send({error: 'Email already exists'});
        } else {
            let hash = bcrypt.hash(req.body.password);
            let new_student = await Student.create({email: req.body.email, password: hash, name: req.body.name});
            let token = jwt.sign({_id: new_student._id, user_type:'student'}, config.jwt_secret_key);
            res.json({student: new_student, token});
        }
    } else {
        return res.status(400).send({error: 'Invalid/Not enough paramters'});
    }
});