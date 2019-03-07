const router = require("express").Router();
const Student = require("../models/school");

router.get("/getdata", function(req, res) {
  Student.find({}, function(err, data) {
    res.json(data);
  });
});

router.post("/add", (req, res) => {
  Student.create(req.body)
    .then(results => {
      res.status(201).json({
        message: "User is createrd"
      });
    })
    .catch(err => {
      res.status(504).json({
        message: "Enter valid Data"
      });
    });
});

router.get("/singal/:Id", (req, res) => {
  Student.findOne({ _id: req.params.Id }, function(err, result) {
    res.json(result);
    console.log(req.params.Id);
  }).catch(err => console.log(message));
});

router.delete("/remove/:id", function(req, res) {
  Student.findByIdAndRemove(req.params.id)
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
});

router.put("/update/:id", function(req, res) {
  Student.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(book => res.json({
      message: "Sucessfully Update record"
    }))
    .catch(err => res.status(422).json({
      message: "Not Found"
    }));
});

module.exports = router;
