var express = require("express");
const Workspace = require("../controllers/workspace.controller");
var router = express.Router();

/* GET users listing. */
router.get("/getAll", Workspace.getWorkspaces);

router.post("/create", Workspace.create);
router.post("/update", Workspace.update);

module.exports = router;
