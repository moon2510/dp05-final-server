const WorkSpaceModel = require("../models/workSpace.model");
class WorkspController {
  async create(req, res) {
    const { name } = req.body;
    try {
      const existedWspace = await WorkSpaceModel.findOne({ name });
      if (existedWspace) return res.status(400).json({ message: "Workspace already exists!" });
      const savedworkspace = new WorkSpaceModel({
        name,
      });
      const newworkspace = await savedworkspace.save();
      res.status(200).json({ message: "Create workspace successfully!", data: newworkspace });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async update(req, res) {
    try {
      const workspaceUpdated = await WorkSpaceModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name } },
        { new: true },
      );
      res
        .status(200)
        .json({ message: "Create workspace successfully!", data: { ...workspaceUpdated } });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async getWorkspaces(req, res) {
    try {
      const workspaces = await WorkSpaceModel.find().populate("managers", "-password");
      res.status(200).json({ message: "Get workspaces successfully!", data: [...workspaces] });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
module.exports = new WorkspController();