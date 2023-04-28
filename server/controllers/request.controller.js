const Request = require("../models/requestLogoff.model");
const UserGroup = require("../models/UserGroup.model");
require("dotenv").config();

const requestControllers = {
  createRequest: async (req, res) => {
    console.log(req.body);
    try {
      const {
        user,
        masters,
        logOffFrom,
        logOffTo,
        logOffType,
        quantity,
        reason,
        status,
      } = req.body;

      const newRequest = new Request({
        user,
        masters,
        logOffFrom,
        logOffTo,
        logOffType,
        quantity,
        reason,
        status,
      });

      // Save mongodb
      await newRequest.save();
      return res.status(201).json({
        message: "Request created successfully",
        status: 201,
        request: newRequest,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  getApprovesOfRequest: async (req, res) => {
    try {
      let mastersL = [];

      const groups = await UserGroup.find();
      console.log(req.params.id);
      console.log(groups);

      groups
        .filter(
          (v) =>
            v.masters.map((v) => v.toString()).includes(req.params.id) ||
            v.staffs.map((v) => v.toString()).includes(req.params.id)
        )
        .flatMap((v) => v.masters)
        .forEach((e) => {
          if (!mastersL.includes(e.toString())) {
            mastersL.push(e.toString());
          }
        });

      res.status(200).json({
        message: "Get approves of the request successfully!",
        data: {
          approve: [...mastersL],
          verifier: mastersL.filter((v) => v !== req.params.id).length,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //   getRequest: async (req, res) => {
  //     try {
  //       const courses = await Course.find({
  //         authorId: req.params.authorId,
  //       });
  //       if (courses) {
  //         res.json(courses);
  //       } else {
  //         res.status(404);
  //         throw new Error("Courses not Found");
  //       }
  //     } catch (err) {
  //       return res.status(500).json({ msg: err.message });
  //     }
  //   },
  //   getAllRequest: async (req, res) => {
  //     try {
  //       const courses = await Course.find({});
  //       if (courses) {
  //         res.json(courses);
  //       } else {
  //         res.status(404);
  //         throw new Error("Courses not Found");
  //       }
  //     } catch (err) {
  //       return res.status(500).json({ msg: err.message });
  //     }
  //   },
};

module.exports = requestControllers;
