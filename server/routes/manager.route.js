var express = require("express");
const auth = require("../middlewares/auth");
const authManager = require("../middlewares/manager");
const ManagerController = require("../controllers/manager.controller");
var router = express.Router();

router.get("/getStaff", auth, authManager, ManagerController.getListStaff);
router.get(
  "/getOneStaff/:id",
  auth,
  authManager,
  ManagerController.getOneStaff
);
router.post("/createStaff", auth, authManager, ManagerController.createStaff);
router.patch(
  "/updateStaff/:id",
  auth,
  authManager,
  ManagerController.updateStaff
);
router.delete(
  "/deleteStaff/:id",
  auth,
  authManager,
  ManagerController.deleteStaff
);

module.exports = router;
