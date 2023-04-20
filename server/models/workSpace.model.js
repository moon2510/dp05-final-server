const mongoose = require('mongoose');

const WorkSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    hrChannel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'channels',
    },

    dayOffChannel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'channels',
    },

    managers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WorkSpace', WorkSpaceSchema, 'workspaces');
