import authentication from './authentication';
import user from './user';
import spGames from './spGames';


function services() {
  const app = this;

  app.configure(authentication);
  app.configure(user);
  app.configure(spGames);
}

export default services;
