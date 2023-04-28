const mongoose = require("mongoose");
const { RequestSTT } = require("../constants/enum");
const Schema = mongoose.Schema;

const RequestLogOffSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    masters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    approval: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    logOffFrom: {
      type: String,
      default: "",
    },

    logOffTo: {
      type: String,
      default: "",
    },

    logOffType: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      default: 0,
    },

    reason: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "RequestLogOff",
  RequestLogOffSchema,
  "requestlogoffs"
);
