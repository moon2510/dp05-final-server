const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema(
  {
    name: {
      type: String,
    },
    slackId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Channel', ChannelSchema, 'channels');
