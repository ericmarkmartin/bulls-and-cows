import mongoose, { Schema } from 'mongoose';

// spGames-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const allDigits = s => /^\d+$/.test(s);
const uniqueCharacters = s => s.length === (new Set(s)).size;
const lengthOf = n => s => s.length === n;

const codeSchemaN = (n) => {
  if (!(n >= 1 && n <= 10)) {
    throw new RangeError('Code must be between 1 and 10 (inclusive) characters long.');
  }
  return new Schema({
    value: {
      type: String,
      required: true,
      validate: [
        { validator: allDigits, msg: 'Code must consist only of digits.' },
        { validator: uniqueCharacters, msg: 'Code may not repeat characters.' },
        { validator: lengthOf(n), msg: `Code must be ${n} characters long.` },
      ],
    },
  });
};

const code4 = codeSchemaN(4);
const spGamesSchema = new Schema(
  {
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    code: { type: code4, required: true },
    guesses: [code4],
  },
  { timestamps: true },
);


const SPGamesModel = mongoose.model('spGames', spGamesSchema);

export { codeSchemaN };
export default SPGamesModel;
