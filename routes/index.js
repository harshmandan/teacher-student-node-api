const express = require('express');
const router = express.Router();
const jwt = require('../middlewares/jwt'); //stateless - mobile apps
const cookie = require('../middlewares/cookie'); //stateless - web apps
const session = require('../middlewares/session'); //stateful - web apps on top of cookie

//routes import
const indexRouter = require('./common/index');
const authRouter = require('./common/auth');
const teacherRouter = require('./teacher/profile');
const batch_t_Router = require('./teacher/batch');
const material_t_Router = require('./teacher/material');
const studentRouter = require('./student/profile');
const batch_s_Router = require('./student/batch');
const material_s_Router = require('./student/material');

//------------Common Routes-----------
router.use('/', indexRouter);
router.use('/auth', authRouter);

//-----------Teacher Routes----------
router.use('/teacher/profile', cookie.teacher, teacherRouter);
router.use('/teacher/batch', cookie.teacher, batch_t_Router);
// router.use('/teacher/material', material_t_Router);

// //---------Student Routes-----------------
router.use('/student/profile', cookie.student, studentRouter);
router.use('/student/batch', cookie.student, batch_s_Router);
// router.use('/student/material', material_s_Router);

module.exports = router;