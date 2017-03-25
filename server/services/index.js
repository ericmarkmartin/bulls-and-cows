import mongoose from 'mongoose';
import authentication from './authentication';
import user from './user';
import spGames from './spGames';
import spGuess from './spGuess';


function services() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(spGames);
  app.configure(spGuess);
}

export default services;
