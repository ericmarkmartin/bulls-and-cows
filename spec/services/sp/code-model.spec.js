import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';

import { codeSchemaN } from '../../../server/services/sp/code-model';
import { codeModel as Code } from './test-models';

chai.use(dirtyChai);


const N = 4;

describe('code', () => {
  describe('schema', () => {
    it('may only be created with lengths from 1 to 10 (inclusive)', () => {
      expect(() => codeSchemaN({ codeLength: 0 })).to.throw(RangeError, 'must be between 1 and 10 (inclusive)');
      expect(() => codeSchemaN({ codeLength: 4 })).to.not.throw(RangeError);
      expect(() => codeSchemaN({ codeLength: 11 })).to.throw(RangeError, 'must be between 1 and 10 (inclusive)');
    });
  });
  describe('model', () => {
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
    it('can generate its own valid codes', () => {
      const v = Code.generateCode();
      const c = Code(v);
      const error = c.validateSync();
      expect(error).to.not.exist();
    });
  });
});
