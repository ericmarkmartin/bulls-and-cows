import service from 'feathers-mongoose';
import spGames from './spGames-model';
import codeN from '../code-model';
import { before, after } from './hooks';

const codeLength = 4;
const { codeSchema, CodeModel } = codeN({ codeLength });
const SPGamesModel = spGames({ codeSchema });

function setup() {
  const app = this;

  const options = {
    Model: SPGamesModel,
    paginate: {
      default: 5,
      max: 25,
    },
  };

  // Initialize our service with any options it requires
  app.use('/spGames', service(options));

  // Get our initialized service to that we can bind hooks
  const spGamesService = app.service('/spGames');

  // Set up our before hooks
  spGamesService.before(before({ addCode: { codeModel: CodeModel } }));

  // Set up our after hooks
  spGamesService.after(after);
}

export { CodeModel as codeModel, SPGamesModel as spGamesModel };
export default setup;
