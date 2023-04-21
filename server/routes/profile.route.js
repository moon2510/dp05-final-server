var express = require("express");
const ProfileController = require("../controllers/profile.controller");
const auth = require("../middlewares/auth");
var router = express.Router();

router.get("/getProfile/", auth, ProfileController.getProfile);
router.patch("/updateProfile/", auth, ProfileController.updateProfile);

module.exports = router;
