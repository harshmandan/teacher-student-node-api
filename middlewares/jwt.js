const jwt = require("jsonwebtoken");
const config = require("../credentials/config");

module.exports.teacher = function (req, res, next) {
  if (req.headers.authorization) {
    jwt.verify(req.headers.authorization, config.jwt_secret_key, function (err, data) {
        if (err) return res.status(401).send({ message: "Invalid authorization code" });
        if (data) {
            console.log(data);
            req.user = {
                ...data
            };

            if(req.user.user_type=="teacher") {
                next();
            } else {
                return res.status(401).send({ message: "You are not a teacher" });
              }

        } else {
            return res.status(401).send({ message: "Invalid authorization code" });
        }
        
      }
    );
  } else {
    return res.status(401).send({ message: "Send authorization code" });
  }
};


module.exports.student = function (req, res, next) {
    
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization, config.jwt_secret_key, function (err, data) {
          if (err) return res.status(401).send({ message: "Invalid authorization code" });
          if (data) {
            console.log(data);
              req.user = {
                  ...data
              };
  
              if(req.user.user_type=="student") {
                  next();
              } else {
                return res.status(401).send({ message: "Invalid authorization code" });
              }
  
          } else {
              return res.status(401).send({ message: "Invalid authorization code" });
          }
          
        }
      );
    } else {
      return res.status(401).send({ message: "Send authorization code" });
    }
  };
  