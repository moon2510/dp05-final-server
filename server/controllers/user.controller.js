const Users = require('../models/user.model');
require('dotenv').config();
// const Payments = require('../models/paymentModel')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserController = {
  register: async (req, res) => {
    try {
      const { fullName, phone, email, IDstaff, avatar, groupId, role } =
        req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: 'The email already exists.' });
      let passwordHash = await bcrypt.hash('123456', 10);

      const newUser = new Users({
        fullName,
        phone,
        email,
        IDstaff,
        avatar,
        groupId,
        role,
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();

      res.json({ msg: 'Create User Successfully' });
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'User does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Incorrect password.' });

      res.json({ msg: 'Login Successfully' });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = UserController;
