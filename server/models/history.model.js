const mongoose = require('mongoose');
const { TypeHistory } = require('../constants/enum');
const Schema = mongoose.Schema;

const HistorySchema = new Schema(
  {
    logOffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'requestlogoffs',
    },

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

    logOffFrom: {
      type: Date,
    },

    logOffTo: {
      type: Date,
    },

    reason: {
      type: String,
    },

    comment: {
      type: String,
    },

    typeLog: {
      type: String,
      enum: Object.values(TypeHistory),
    },

    contentLog: {
      type: String,
    },

    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('History', HistorySchema, 'histories');
