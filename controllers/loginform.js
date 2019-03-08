const loginform = require("../models/loginform");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validationsignin = require("../validation/loginform");
const validationlogin = require("../validation/login")




exports.logingetdata = (req, res) => {
  loginform.find({}, function(err, data) {
    res.json(data);
  });
};

exports.signin = function(req, res) {
  const { errors, isValid } = validationsignin(req.body);
  if (!isValid) {
    return res.status(300).json(errors);
  }
  loginform
    .find({ email: req.body.email })
    .exec()
    .then(results => {
      if (results.length >= 1) {
        return res.status(405).json({
          message: "Mail is exists"
        });
      } else {
        bcrypt.hash(
          req.body.password && req.body.confimPassword,
          10,
          (err, hash) => {
            if (err) {
              return res.status(500).json({
                message: "Not found"
              });
            } else {
              console.log(req.body);
              var data = new loginform({
                email: req.body.email,
                password: hash,
                confimPassword: hash
              });
              loginform
                .create(data)
                .catch(err => {
                  res.status(504).json({
                    message: "You not Enter valid data"
                  });
                })
                .then(results => {
                  res.status(201).json({
                    message: "User is createrd"
                  });
                });
            }
          }
        );
      }
    });
};

exports.login = (req, res, next) => {
  const { errors, isValid } = validationlogin(req.body);
  if (!isValid) {
    return res.status(300).json(errors);
  }
  loginform
    .find({ email: req.body.email })
    .exec()
    .then(results => {
      if (results.length < 1) {
        res.status(500).json({
          message: "Mail not Found , User doesnot exist"
        });
      }
      bcrypt.compare(req.body.password, results[0].password, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Not found"
          });
        }
        if (result) {
          const token = jwt.sign(
            { id: results.id, email: results.email },
            process.env.test,
            {
              expiresIn: 10222
            }
          );

          return res.status(504).json({
            message: "Sucefull",
            token: token
          });
        }
        res.status(401).json({
          message: "Not Found"
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Not found"
      });
    });
};

exports.deletelogin = function(req, res) {
  loginform
    .findByIdAndRemove(req.params.id)
    .then(results => {
      res.status(201).json({
        message: "Sucessfully Delete record"
      });
    })
    .catch(err => {
      res.status(504).json({
        message: "Not Found"
      });
    });
};
