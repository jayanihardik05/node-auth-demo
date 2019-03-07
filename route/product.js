const express = require('express');
const router = require("express").Router()
const multer = require('multer'),
path = require('path');
const Detail = require('../models/product');



const upload = multer({storage: multer.diskStorage({

  destination: function (req, file, callback) 
  { callback(null, "./uplods");},
  filename: function (req, file, callback) 
  { callback(null, file.fieldname +'-' + Date.now()+path.extname(file.originalname));}

}),

fileFilter: function(req, file, callback) {
  var ext = path.extname(file.originalname)
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return callback(/*res.end('Only images are allowed')*/ null, false)
  }
  callback(null, true)
}
});



router.use(express.static('uplods'));

router.post('/add', upload.any() ,function(req,res){
  
  console.log("req.body"); //form fields
  console.log(req.body);
  console.log("req.file");
  console.log(req.files); //form files
  
  if(!req.body && !req.files){
    res.json({success: false});
  } else {    
    Detail.findOne({},function(err,data){
      console.log("into detail");
      var c
      if (data) {
        console.log("if");
        c = data.unique_id + 1;
      }else{
        c=1;
      }

      const detail = new Detail({
        Name: req.body.Name,
        image1:req.files[0].filename,
        image2:req.files[1].filename,
      });

      detail.save(req.body,function(err, Person){
        if(err)
          console.log(err);
        else
          res.redirect('/');

      });

    }).sort({_id: -1}).limit(1);

  }
});


module.exports = router;
