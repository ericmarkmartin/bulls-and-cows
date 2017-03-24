import service from 'feathers-mongoose';
import spGames from './spGames-model';
import { before, after } from './hooks';

function setup() {
  const app = this;

  const options = {
    Model: spGames,
    paginate: {
      default: 5,
      max: 25,
    },
  };

  // Initialize our service with any options it requires
  app.use('/spGames', service(options));

  // Get our initialize service to that we can bind hooks
  const spGamesService = app.service('/spGames');

  // Set up our before hooks
  spGamesService.before(before);

  // Set up our after hooks
  spGamesService.after(after);
}

export default setup;
