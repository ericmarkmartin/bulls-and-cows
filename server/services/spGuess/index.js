import { before, after } from './hooks';

class Service {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.spGames = app.service('spGames');
  }

  get(id, params) {
    return this.spGames.get(id).then(game => ({
      id,
      text: `The code for game ${id} is ${game.code.value}. Guess: ${params.query.guess}`,
    }));
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
