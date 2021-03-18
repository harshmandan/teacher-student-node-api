const jwt = require("jsonwebtoken");
const config = require("../credentials/config");

module.exports.teacher = function (req, res, next) {
  if (req.session && req.session.isLoggedin) {
    if(req.session.user.user_type=="teacher") {
        next();
    } else {
      return res.status(401).send({ message: "Invalid authorization code" });
    }
} else {
return res.status(401).send({ message: "Send authorization code" });
}
};


module.exports.student = function (req, res, next) {
    if (req.session && req.session.isLoggedin) {
          if(req.session.user.user_type=="student") {
              next();
          } else {
            return res.status(401).send({ message: "Invalid authorization code" });
          }
    } else {
      return res.status(401).send({ message: "Send authorization code" });
    }
  };
  