const mongoose = require('mongoose');

const WorkSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    hrChannel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channels',
      },
    ],

    dayOffChannel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channels',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WorkSpace', WorkSpaceSchema, 'workspaces');
