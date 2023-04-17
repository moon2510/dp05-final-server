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
      type: String,
      default: '',
    },

    logoffTo: {
      type: String,
      default: '',
    },

    logoffType: {
      type: String,
      default: '',
    },

    contentLog: {
      type: String,
      default: '',
    },

    quantity: {
      type: Number,
      default: 0,
    },

    reason: {
      type: String,
      default: '',
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
