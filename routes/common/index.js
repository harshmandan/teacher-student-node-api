const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.json({msg: 'Server is up and running'});
});

module.exports=router;