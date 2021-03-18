const express = require('express');
const router = express.Router();
const jwt = require('../middlewares/jwt');
const cookie = require('../middlewares/cookie');
const session = require('../middlewares/session');

//routes import
const indexRouter = require('./common/index');
const authRouter = require('./common/auth');
// const teacherRouter = require('./teacher/profile');
// const batch_t_Router = require('./teacher/batch');
// const material_t_Router = require('./teacher/material');
// const studentRouter = require('./student/profile');
// const batch_s_Router = require('./student/batch');
// const material_s_Router = require('./student/material');

//------------Common Routes-----------
router.use('/student', session.student, indexRouter);
router.use('/teacher', session.teacher, indexRouter);
router.use('/auth', authRouter);

//-----------Teacher Routes----------
// router.use('/teacher/profile', teacherRouter);
// router.use('/teacher/batch', batch_t_Router);
// router.use('/teacher/material', material_t_Router);

// //---------Student Routes-----------------
// router.use('/student/profile/get', studentRouter);
// router.use('/student/profile/get_mobile', studentRouter);
// router.use('/student/batch', batch_s_Router);
// router.use('/student/material', material_s_Router);

module.exports = router;