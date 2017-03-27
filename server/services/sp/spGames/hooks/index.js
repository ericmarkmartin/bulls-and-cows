import { hooks as auth } from 'feathers-authentication';
import addCode from './addCode';

const before = options => ({
  all: [
    // auth.verifyOrRestrict({ restrict: { store: false } }),
    // auth.populateOrRestrict({ restrict: { store: false } }),
  ],
  find: [],
  get: [],
  create: [addCode(options.addCode)],
  update: [],
  patch: [],
  remove: [],
});

const after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};


export { before, after };
