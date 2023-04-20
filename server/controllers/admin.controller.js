const Users = require('../models/user.model');
const WorkSpace = require('../models/workSpace.model');
const bcrypt = require('bcrypt');
require('dotenv').config();

const AdminController = {
  createManager: async (req, res) => {
    try {
      const { fullName, phone, email, staffId, avatar, groupsId, role } = req.body;

      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'The email already exists.' });
      }

      const passwordHash = await bcrypt.hash('123456', 10);

      const newUser = new Users({
        fullName,
        phone,
        email,
        staffId,
        avatar,
        groupsId,
        role: 'MANAGER',
        password: passwordHash,
      });

      await newUser.save();

      res.json({ msg: 'Create User Successfully' });
    } catch (error) {
      console.log(error);
    }
  },

  getListManager: async (req, res) => {
    try {
      const managers = await Users.find({ role: 'MANAGER' }).sort({ fullName: 1 });

      res.send(managers);
    } catch (error) {
      console.log(error);
    }
  },

  deleteManager: async (req, res) => {
    try {
      const exist_manager = await Users.findById(req.params.id);
      if (!exist_manager) {
        return res.status(400).json({ msg: 'The manager does not exist.' });
      }

      await Users.findOneAndDelete({ _id: req.params.id });

      res.json({ message: 'Manager deleted successfully.' });
    } catch (error) {
      console.log(error);
    }
  },

  updateManager: async (req, res) => {
    try {
      const { fullName, phone, email, staffId, avatar, groupsId, role } = req.body;

      const exist_manager = await Users.findById(req.params.id);
      if (!exist_manager) {
        return res.status(400).json({ msg: 'The manager does not exist.' });
      }

      const passwordHash = await bcrypt.hash('123456', 10);

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

      res.json({ message: 'Manager updated successfully.' });
    } catch (error) {
      console.log(error);
    }
  },

  getWorkSpaces: async (req, res) => {
    try {
      const workspace = await WorkSpace.find({});
      res.status(200).json(workspace);
    } catch (error) {
      console.log(error);
    }
  },

  createWorkSpace: async (req, res) => {
    try {
      const { name, hrChannel, dayOffChannel, managers } = req.body;

      const exist_workspace = await WorkSpace.findOne({ name });
      if (exist_workspace) {
        return res.status(400).json({ msg: 'The workspace already exists.' });
      }

      const new_workspace = new WorkSpace({
        name,
        hrChannel,
        dayOffChannel,
        managers,
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
      if (!exist_workspace) {
        return res.status(400).json({ msg: 'The workspace does not exist.' });
      }

      await WorkSpace.findOneAndDelete({ _id: req.params.id });

      res.json({ message: 'Workspace deleted successfully.' });
    } catch (error) {
      console.log(error);
    }
  },

  updateWorkSpace: async (req, res) => {
    try {
      const { name, hrChannel, dayOffChannel, managers } = req.body;

      const exist_workspace = await WorkSpace.findById(req.params.id);
      if (!exist_workspace) {
        return res.status(400).json({ msg: 'The workspace does not exist.' });
      }

      const update_workspace = {
        name,
        hrChannel,
        dayOffChannel,
        managers,
      };

      await WorkSpace.findByIdAndUpdate({ _id: req.params.id }, update_workspace);

      res.json({ message: 'Workspace updated successfully.' });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = AdminController;
