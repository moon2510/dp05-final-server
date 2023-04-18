const UserGroups = require("../models/UserGroup.model");
const Users = require("../models/user.model");
const bcrypt = require("bcryptjs");
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
};

module.exports = ManagerController;
