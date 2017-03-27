// src/services/spGuess/hooks/addCode.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html
const defaults = {};

const addCode = options => (hook) => {
  const config = Object.assign({}, defaults, options);
  Object.assign(hook.data, { code: config.codeModel.generateCode() });
};

export default addCode;
