import mongoose, { Schema } from 'mongoose';
// spGames-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const spGamesSchema = ({ codeSchema } = {}) => (
  new Schema(
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      code: { type: codeSchema, required: true },
      guesses: [codeSchema],
    },
    { timestamps: true },
  )
);


const SPGamesModel = ({ codeSchema } = {}) => (
  mongoose.model('spGames', spGamesSchema({ codeSchema }))
);

export default SPGamesModel;
