import authentication from 'feathers-authentication';


export default function setup() {
  const app = this;

  const config = app.get('auth');


  app.configure(authentication(config));
}
