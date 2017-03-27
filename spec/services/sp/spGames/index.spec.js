import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';

import app from '../../../../server/app';

chai.use(dirtyChai);


describe('spGames service', () => {
  it('registered the spGames service', () => {
    expect(app.service('spGames')).to.be.ok();
  });
});
