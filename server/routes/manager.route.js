var express = require('express');
const auth = require('../middlewares/auth');
const authManager = require('../middlewares/manager');
const ManagerController = require('../controllers/manager.controller');
var router = express.Router();

router.get('/getStaff', auth, authManager, ManagerController.getListStaff);
router.get(
  '/getOneStaff/:id',
  auth,
  authManager,
  ManagerController.getOneStaff
);
router.post('/createStaff', auth, authManager, ManagerController.createStaff);
router.patch(
  '/updateStaff/:id',
  auth,
  authManager,
  ManagerController.updateStaff
);
router.delete(
  '/deleteStaff/:id',
  auth,
  authManager,
  ManagerController.deleteStaff
);

/* GET users listing. */
router.get('/getUserGroup', auth, authManager, ManagerController.getUserGroups);
router.post(
  '/createUserGroup',
  auth,
  authManager,
  ManagerController.createUserGroup
);
router.patch(
  '/updateUserGroup/:id',
  auth,
  authManager,
  ManagerController.updateUserGroup
);
router.delete(
  '/deleteUserGroup/:id',
  auth,
  authManager,
  ManagerController.deleteUserGroup
);
router.get(
  '/getOneUserGroup/:id',
  auth,
  authManager,
  ManagerController.getOneUserGroup
);
router.get('/getStaffs', auth, authManager, ManagerController.getStaffs);
router.get(
  '/getHistoryDayOff',
  auth,
  authManager,
  ManagerController.getHistoryDayOff
);
router.get(
  '/getUserById/:id',
  auth,
  authManager,
  ManagerController.getUserById
);
module.exports = router;
