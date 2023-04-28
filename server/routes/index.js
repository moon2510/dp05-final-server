var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use("/admin", require("./admin.route"));
router.use("/profile", require("./profile.route"));
router.use("/manager", require("./manager.route"));
router.use("/user", require("./user.route"));
router.use("/staff", require("./request.route"));
module.exports = router;
