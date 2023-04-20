const mongoose = require('mongoose');

const WorkSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    hrChannel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
      },
    ],

    dayOffChannel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WorkSpace', WorkSpaceSchema, 'workspaces');
