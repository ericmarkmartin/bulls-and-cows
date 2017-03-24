import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import mongoose from 'mongoose';

import { codeSchemaN } from '../../../server/services/spGames/spGames-model';

chai.use(dirtyChai);


const N = 4;
const Code = mongoose.model('codes', codeSchemaN(4));

describe('code schema', () => {
  it('may only be set to lengths from 1 to 10 (inclusive)', () => {
    expect(() => codeSchemaN(0)).to.throw(RangeError, 'must be between 1 and 10 (inclusive)');
    expect(() => codeSchemaN(4)).to.not.throw(RangeError);
    expect(() => codeSchemaN(11)).to.throw(RangeError, 'must be between 1 and 10 (inclusive)');
  });
  it('requires a value', () => {
    const c = Code({});
    const error = c.validateSync();
    expect(error.errors.value.message).to.equal('Path `value` is required.');
  });
  it('only allows digits', () => {
    const c = Code({ value: 'ABCD' });
    const error = c.validateSync();
    expect(error.errors.value.message).to.equal('Code must consist only of digits.');
  });
  it('does not repeat characters', () => {
    const c = Code({ value: '0012' });
    const error = c.validateSync();
    expect(error.errors.value.message).to.equal('Code may not repeat characters.');
  });
  it(`may only be of length ${N}`, () => {
    const c = Code({ value: '0' });
    const error = c.validateSync();
    expect(error.errors.value.message).to.equal(`Code must be ${N} characters long.`);
  });
});
