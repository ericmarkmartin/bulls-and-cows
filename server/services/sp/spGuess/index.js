import { before, after } from './hooks';

class Service {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.spGames = app.service('spGames');
  }

  addGuess(gameId, guess) {
    return this.spGames.patch(
      gameId,
      { $push: { guesses: { value: guess } } },
    );
  }

  create(data, params) {
    const { gameId } = params.query;
    const { guess } = data;

    return this.addGuess(gameId, guess)
      .then(({ code: { value: secret } }) => {
        const NONE = 'NONE';
        const COW = 'COW';
        const BULL = 'BULL';
        return guess.split('')
          .map((digit, i) => {
            if (digit === secret[i]) {
              return BULL;
            } else if (secret.includes(digit)) {
              return COW;
            }
            return NONE;
          })
          .filter(val => val !== NONE)
          .reduce(
            (rating, val) => {
              const key = val === BULL ? 'BULLS' : 'COWS';
              return Object.assign(rating, { [key]: rating[key] + 1 });
            },
            { BULLS: 0, COWS: 0 },
          );
      })
      .catch((err) => {
        if (err.name === 'NotFound') {
          return err.message;
        } else if (err.name === 'BadRequest' && err.errors.guesses) {
          return err.errors.guesses.errors.value.message;
        }
        return 'Request failed';
      });
  }
}

function setup() {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/spGuess', new Service());

  // Get our initialized service to that we can bind hooks
  const spGuessService = app.service('/spGuess');

  // Set up our before hooks
  spGuessService.before(before);

  // Set up our after hooks
  spGuessService.after(after);
}

export default setup;
