const UserGroups = require("../models/UserGroup.model");
const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
require("dotenv").config();

const ManagerController = {
  createStaff: async (req, res) => {
    try {
      console.log(req.body);
      const { fullName, email, slackId } = req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exists." });
      let passwordHash = await bcrypt.hash("123456", 10);

      const newUser = new Users({
        fullName,
        email,
        slackId,
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();

      res.json({ msg: "Create staff Successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  getUserGroups: async (req, res) => {
    try {
      const UserGroup = await UserGroups.find({})

        .populate({
          path: "staffs",
        })

        .populate({
          path: "masters",
        });

      res.status(200).json(UserGroup);
    } catch (error) {
      console.log(error);
    }
  },
  getOneUserGroup: async (req, res) => {
    try {
      const userGroup = await UserGroups.findById(req.params.id)

        .populate({
          path: "staffs",
        })

        .populate({
          path: "masters",
        });
      res.send(userGroup);
    } catch (error) {
      console.log(error);
    }
  },
  createUserGroup: async (req, res) => {
    try {
      const { name, staffs, masters } = req.body;

      const exist_usergroup = await UserGroups.findOne({ name });

      if (exist_usergroup)
        return res.status(400).json({ msg: "The UserGroup already exists." });

      const new_usergroup = new UserGroups({
        name,

        staffs,

        masters,
      });

      await new_usergroup.save();

      res.json({ msg: "Create UserGroup Successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  getOneStaff: async (req, res) => {
    try {
      const staffs = await Users.findById(req.params.id);
      res.send(staffs);
    } catch (error) {
      console.log(error);
    }
  },
  deleteUserGroup: async (req, res) => {
    try {
      const exist_usergroup = await UserGroups.findById(req.params.id);

      if (exist_usergroup)
        return res.status(400).json({ msg: "The UserGroup already exists." });

      await exist_usergroup.findOneAndDelete({ _id: req.params.id });

      res.json({ message: "UserGroup deleted successfully." });
    } catch (error) {
      console.log(error);
    }
  },
  getListStaff: async (req, res) => {
    try {
      const staffs = await Users.find({ role: "Staff" }).sort({
        fullName: 1,
      });
      res.send(staffs);
      console.log(staffs);
    } catch (error) {
      console.log(error);
    }
  },
  deleteStaff: async (req, res) => {
    try {
      const exist_staff = await Users.findById(req.params.id);
      if (!exist_staff)
        return res.status(400).json({ msg: "The staff doesnt exists." });

      await Users.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "Staff deleted successfully." });
    } catch (error) {
      console.log(error);
    }
  },
  updateStaff: async (req, res) => {
    try {
      const { fullName, email, slackId } = req.body;

      const exist_staff = await Users.findById(req.params.id);
      if (!exist_staff)
        return res.status(400).json({ msg: "The staff doesnt exists." });

      let passwordHash = await bcrypt.hash("123456", 10);

      const update_staff = {
        fullName,
        email,
        slackId,
        password: passwordHash,
      };
      await Users.findByIdAndUpdate({ _id: req.params.id }, update_staff);

      res.json({ message: "Staff Updated successfully." });
    } catch (error) {
      console.log(error);
    }
  },

  updateUserGroup: async (req, res) => {
    try {
      const { name, staffs, masters } = req.body;

      const exist_usergroup = await UserGroups.findById(req.params.id);

      if (!exist_usergroup)
        return res.status(400).json({ msg: "The UserGroup doesn't exists." });

      const update_usergroup = {
        name,

        staffs,

        masters,
      };

      await UserGroups.findByIdAndUpdate(
        { _id: req.params.id },
        update_usergroup
      );

      res.json({ message: "UserGroup Updated successfully." });
    } catch (error) {
      console.log(error);
    }
  },
  getStaffs: async (req, res) => {
    try {
      const Staff = await userModel.find({ role: "Staff" });
      res.json(Staff);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = ManagerController;
