<<<<<<< Updated upstream
const Users = require('../models/user.model');
require('dotenv').config();
=======
const Users = require("../models/user.model");
const WorkSpace = require("../models/workSpace.model");
require("dotenv").config();
>>>>>>> Stashed changes

const AdminController = {
  createManager: async (req, res) => {
    try {
<<<<<<< Updated upstream
      const { fullName, phone, email, staffId, avatar, groupsId, role } =
        req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: 'The email already exists.' });
      let passwordHash = await bcrypt.hash('123456', 10);
=======
      const { fullName, phone, email, staffId, avatar, groupsId, role } = req.body;

      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "The email already exists." });
      let passwordHash = await bcrypt.hash("123456", 10);
>>>>>>> Stashed changes

      const newUser = new Users({
        fullName,
        phone,
        email,
        staffId,
        avatar,
        groupsId,
<<<<<<< Updated upstream
        role,
=======
        role: "MANAGER",
>>>>>>> Stashed changes
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();

<<<<<<< Updated upstream
      res.json({ msg: 'Create User Successfully' });
=======
      res.json({ msg: "Create User Successfully" });
>>>>>>> Stashed changes
    } catch (error) {
      console.log(error);
    }
  },
  getListManager: async (req, res) => {
    try {
<<<<<<< Updated upstream
      const managers = await Users.find({ role: 'Manager' }).sort({
=======
      const managers = await Users.find({ role: "Manager" }).sort({
>>>>>>> Stashed changes
        fullName: 1,
      });
      res.send(managers);
    } catch (error) {
      console.log(error);
    }
  },
<<<<<<< Updated upstream
=======
  deleteManager: async (req, res) => {
    try {
      const exist_manager = await Users.findById(req.params.id);
      if (!exist_manager) return res.status(400).json({ msg: "The manager doesnt exists." });

      await Users.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "Manager deleted successfully." });
    } catch (error) {
      console.log(error);
    }
  },
  updateManager: async (req, res) => {
    try {
      const { fullName, phone, email, staffId, avatar, groupsId, role } = req.body;

      const exist_manager = await Users.findById(req.params.id);
      if (!exist_manager) return res.status(400).json({ msg: "The manager doesnt exists." });

      let passwordHash = await bcrypt.hash("123456", 10);

      const update_manager = {
        fullName,
        phone,
        email,
        staffId,
        avatar,
        groupsId,
        role,
        password: passwordHash,
      };
      await Users.findByIdAndUpdate({ _id: req.params.id }, update_manager);

      res.json({ message: "Manager Updated successfully." });
    } catch (error) {
      console.log(error);
    }
  },
  

  getWorkSpaces: async (req, res) => {
    try {
      const workspace = await WorkSpace.find({})
        // .populate({
        //   path: hrChannel,
        // })
        // .populate({
        //   path: dayOffChannel,
        // })
        // .populate({
        //   path: managers,
        // });
        res.status(200).json(workspace);
    } catch (error) {
      console.log(error);
    }
  },
  createWorkSpace: async (req, res) => {
    try {
      const { name, hrChannel, dayOffChannel, managers } = req.body;

      const exist_workspace = await WorkSpace.findOne({ name });
      if (exist_workspace) return res.status(400).json({ msg: "The workspace already exists." });

      const new_workspace = new WorkSpace({
        name,
        hrChannel,
        dayOffChannel,
        managers,
      });

      await new_workspace.save();

      res.json({ msg: "Create Workspace Successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  deleteWorkSpace: async (req, res) => {
    try {
      const exist_workspace = await WorkSpace.findById(req.params.id);
      if (!exist_workspace) return res.status(400).json({ msg: "The workspace doesnt exists." });

      await WorkSpace.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "Workspace deleted successfully." });
    } catch (error) {
      console.log(error);
    }
  },
  updateWorkSpace: async (req, res) => {
    try {
      const { name, hrChannel, dayOffChannel,managers } = req.body;

      const exist_workspace = await WorkSpace.findById(req.params.id);
      if (!exist_workspace) return res.status(400).json({ msg: "The workspace doesnt exists." });

      const update_workspace = {
        name,
        hrChannel,
        dayOffChannel,
        managers,
      };
      await PostMessage.findByIdAndUpdate({ _id: req.params.id }, update_workspace);

      res.json({ message: "Workspace Updated successfully." });
    } catch (error) {
      console.log(error);
    }
  },
>>>>>>> Stashed changes
};

module.exports = AdminController;
