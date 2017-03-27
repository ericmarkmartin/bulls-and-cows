import mongoose, { Schema } from 'mongoose';
import { sampleSize } from 'lodash';

const allDigits = s => /^\d+$/.test(s);
const uniqueCharacters = s => s.length === (new Set(s)).size;
const lengthOf = n => s => s.length === n;

const codeSchemaN = ({ codeLength }) => {
  if (!(codeLength >= 1 && codeLength <= 10)) {
    throw new RangeError('Code must be between 1 and 10 (inclusive) characters long.');
  }
  const codeSchema = new Schema(
    {
      value: {
        type: String,
        required: true,
        validate: [
          { validator: allDigits, msg: 'Code must consist only of digits.' },
          { validator: uniqueCharacters, msg: 'Code may not repeat characters.' },
          { validator: lengthOf(codeLength), msg: `Code must be ${codeLength} characters long.` },
        ],
      },
    },
    { _id: false },
  );

  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  codeSchema.statics.generateCode = () => ({ value: sampleSize(digits, codeLength).join('') });

  return codeSchema;
};

const codeModelN = ({ codeLength }) => (
  mongoose.model('code', codeSchemaN({ codeLength }))
);

const codeN = ({ codeLength }) => ({
  codeSchema: codeSchemaN({ codeLength }),
  CodeModel: codeModelN({ codeLength }),
});

export { codeSchemaN, codeModelN };
export default codeN;
