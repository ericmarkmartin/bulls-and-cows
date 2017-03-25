import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import app from '../../../server/app';

chai.use(dirtyChai);

describe('spGuess service', () => {
  it('registered the spGuess service', () => {
    expect(app.service('spGuess')).to.be.ok();
  });
});
