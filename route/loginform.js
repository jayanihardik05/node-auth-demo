const router = require("express").Router();
const loginform = require("../models/loginform");


router.get("/logindata", (req, res) => {
  loginform.find({}, function(err, data) {
    res.json(data);
  });
});

router.post("/addemail", function(req, res) {
  loginform
    .find({ email: req.body.email })
    .exec()
    .then(results => {
      if (results.length >= 1) {
        return res.status(405).json({
          message: "Mail is exists"
        });
      } else {
        loginform.create(req.body)
        .catch(err =>{
          res.status(504).json({
            message: "You not Enter valid data"
          })
        })
        .then(results => {
          res.status(201).json({
            message: "User is createrd"
          });
        });
      }
    });
});
module.exports = router;
