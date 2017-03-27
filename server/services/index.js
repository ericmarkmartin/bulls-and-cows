import mongoose from 'mongoose';
import authentication from './authentication';
import user from './user';
import { spGames, spGuess } from './sp';

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
