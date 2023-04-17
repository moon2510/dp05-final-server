const mongoose = require('mongoose');
const { RequestSTT } = require('../constants/enum');
const Schema = mongoose.Schema;

const RequestLogOffSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },

    masters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],

    approval: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],

    logoffFrom: {
      type: Date,
    },

    logoffTo: {
      type: Date,
    },

    logoffType: {
      type: String,
    },

    contentLog: {
      type: String,
    },

    quantity: {
      type: Number,
    },

    reason: {
      type: String,
    },

    status: {
      type: String,
      enum: Object.values(RequestSTT),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'RequestLogOff',
  RequestLogOffSchema,
  'requestlogoffs'
);
