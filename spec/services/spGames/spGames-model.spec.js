import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';

import SPGamesModel from '../../../server/services/spGames/spGames-model';

chai.use(dirtyChai);


describe('spGames model', () => {
  it('requires a code', () => {
    const spGame = new SPGamesModel();
    const error = spGame.validateSync();
    expect(error.errors.code.message).to.equal('Path `code` is required.');
  });
});
