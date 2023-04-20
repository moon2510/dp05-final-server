<<<<<<< Updated upstream
const mongoose = require("mongoose");
const { Role } = require("../constants/enum");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      unique: true,
      default: "",
    },

    password: {
      type: String,
      default: "",
    },

    slackId: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    groupsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usergroups",
      },
    ],

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.STAFF,
    },
=======
const Users = require('../models/user.model');
const WorkSpace = require('../models/workSpace.model');
require('dotenv').config();

const AdminController = {
  createManager: async (req, res) => {
    try {
      const { fullName, phone, email, stackId, avatar, groupsId, role } =
        req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: 'The email already exists.' });
      let passwordHash = await bcrypt.hash('123456', 10);
      const newUser = new Users({
        fullName,
        phone,
        email,
        stackId,
        avatar,
        groupsId,
        role,
        role: 'Manager',
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();
      res.json({ msg: 'Create User Successfully' });
    } catch (error) {
      console.log(error);
    }
>>>>>>> Stashed changes
  },
  getListManager: async (req, res) => {
    try {
      const managers = await Users.find({ role: 'Manager' }).sort({
        fullName: 1,
      });
      res.send(managers);
    } catch (error) {
      console.log(error);
    }
  },
  deleteManager: async (req, res) => {
    try {
      const exist_manager = await Users.findById(req.params.id);
      if (!exist_manager)
        return res.status(400).json({ msg: 'The manager doesnt exists.' });

<<<<<<< Updated upstream
module.exports = mongoose.model("User", UserSchema, "users");
=======
      await Users.findOneAndDelete({ _id: req.params.id });
      res.json({ message: 'Manager deleted successfully.' });
    } catch (error) {
      console.log(error);
    }
  },
  updateManager: async (req, res) => {
    try {
      const { fullName, phone, email, staffId, avatar, groupsId, role } =
        req.body;

      const exist_manager = await Users.findById(req.params.id);
      if (!exist_manager)
        return res.status(400).json({ msg: 'The manager doesnt exists.' });

      let passwordHash = await bcrypt.hash('123456', 10);

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

      res.json({ message: 'Manager Updated successfully.' });
    } catch (error) {
      console.log(error);
    }
  },
  getOneWorkSpace: async (req, res) => {
    try {
      const WorkSpaces = await WorkSpace.findById(req.params.id)
        .populate({ path: hrChannel })
        .populate({ path: dayOffChannel });
      res.send(WorkSpaces);
    } catch (error) {
      console.log(error);
    }
  },
  getWorkSpace: async (req, res) => {
    try {
      const workspace = await WorkSpace.find({});
      // .populate({
      //   path: 'hrChannel',
      // })
      // .populate({
      //   path: 'dayOffChannel',
      // });
      res.status(200).json(workspace);
    } catch (error) {
      console.log(error);
    }
  },
  createWorkSpace: async (req, res) => {
    try {
      const { name, hrChannel, dayOffChannel } = req.body;

      const exist_workspace = await WorkSpace.findOne({ name });
      if (exist_workspace)
        return res.status(400).json({ msg: 'The workspace already exists.' });

      const new_workspace = new WorkSpace({
        name,
        hrChannel,
        dayOffChannel,
      });

      await new_workspace.save();

      res.json({ msg: 'Create Workspace Successfully' });
    } catch (error) {
      console.log(error);
    }
  },
  deleteWorkSpace: async (req, res) => {
    try {
      const exist_workspace = await WorkSpace.findById(req.params.id);
      if (!exist_workspace)
        return res.status(400).json({ msg: 'The workspace doesnt exists.' });

      await WorkSpace.findOneAndDelete({ _id: req.params.id });
      res.json({ message: 'Workspace deleted successfully.' });
    } catch (error) {
      console.log(error);
    }
  },
  updateWorkSpace: async (req, res) => {
    try {
      const { name, hrChannel, dayOffChannel } = req.body;

      const exist_workspace = await WorkSpace.findById(req.params.id);
      if (!exist_workspace)
        return res.status(400).json({ msg: 'The workspace doesnt exists.' });

      const update_workspace = {
        name,
        hrChannel,
        dayOffChannel,
      };
      await PostMessage.findByIdAndUpdate(
        { _id: req.params.id },
        update_workspace
      );

      res.json({ message: 'Workspace Updated successfully.' });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = AdminController;
>>>>>>> Stashed changes
