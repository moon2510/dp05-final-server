var express = require("express");
const requestControllers = require("../controllers/request.controller");
const auth = require("../middlewares/auth");
var router = express.Router();

router.post("/create-request", auth, requestControllers.createRequest);
router.get("/get-masters/:id", auth, requestControllers.getApprovesOfRequest);

module.exports = router;
