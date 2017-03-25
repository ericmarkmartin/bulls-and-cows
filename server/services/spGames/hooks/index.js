import { hooks as auth } from 'feathers-authentication';

const before = {
  all: [
    // auth.verifyOrRestrict({ restrict: { store: false } }),
    // auth.populateOrRestrict({ restrict: { store: false } }),
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};

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
