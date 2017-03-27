import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import dirtyChai from 'dirty-chai';

import sinon from 'sinon';

import app from '../../../../server/app';

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('spGuess service', () => {
  it('registered the spGuess service', () => {
    expect(app.service('spGuess')).to.be.ok();
  });

  describe('the create service method', () => {
    const spGuess = app.service('spGuess');
    spGuess.addGuess = sinon
      .stub()
      .withArgs('58d778bf90d9b25fe9a2fdde')
      .returns(Promise.resolve({
        _id: '58d778bf90d9b25fe9a2fdde',
        updatedAt: '2017-03-26T08:16:30.932Z',
        createdAt: '2017-03-26T08:15:59.865Z',
        code: {
          value: '4567',
        },
        guesses: [
          {
            value: '0278',
          },
        ],
        __v: 0,
      }));

    it('rates guesses correctly', () => {
      const rateGuess = guess => spGuess.create({ guess }, { query: { gameId: '58d778bf90d9b25fe9a2fdde' } });
      const rating = (bulls, cows) => ({ BULLS: bulls, COWS: cows });

      expect(rateGuess('0123')).to.become(rating(0, 0));
      expect(rateGuess('4123')).to.become(rating(1, 0));
      expect(rateGuess('0124')).to.become(rating(0, 1));
      expect(rateGuess('4623')).to.become(rating(1, 1));
      expect(rateGuess('4567')).to.become(rating(4, 0));
    });

    describe('errors', () => {
      it('Gives a not found message with an invalid or missing gameId', () => {

      });
      it('Gives a validation message with an invalid or missing guess', () => {

      });
    });
  });
});
