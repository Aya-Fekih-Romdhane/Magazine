const router=require('express').Router();
const profileController=require('./../controllers/profile.controller')
const middleware=require('./../helpers/middleware');
var multer = require("multer");
router.get('/current-user',middleware.auth,profileController.current_user);
router.post('/change-password',middleware.auth,profileController.change_password);

//  Storing uploaded files
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/profile_img");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  var upload = multer({ storage: storage, fileFilter: fileFilter }).single("profile_image");

  router.post("/imageprofile", (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).send("Something went wrong!");
      }
        res.send(req.file);
    });
  });


  router.put('/update-profile',upload, middleware.auth,profileController.update_profile);

  module.exports = router;
  
