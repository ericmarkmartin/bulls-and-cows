import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';

import addCode from '../../../../../server/services/sp/spGames/hooks/addCode';
import { codeModel as Code } from '../../test-models';

chai.use(dirtyChai);

describe('spGuess addCode hook', () => {
  it('can be used', () => {
    const options = { codeModel: Code };
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {},
    };

    addCode(options)(mockHook);

    expect(mockHook.data.code).to.exist();
  });
});
