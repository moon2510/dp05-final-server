const mongoose = require('mongoose');

const WorkSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    hrChannel:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channels',
<<<<<<< Updated upstream
      },
    ],
=======
    },
>>>>>>> Stashed changes

    dayOffChannel: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channels',
<<<<<<< Updated upstream
=======
      },

    managers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
>>>>>>> Stashed changes
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WorkSpace', WorkSpaceSchema, 'workspaces');
