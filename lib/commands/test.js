'use strict';

const Logger  = require('../logger');
const Utils   = require('../utils');
const message = require('../messages');

module.exports = function () {
  Utils.ensurePackagesExist();
  Utils.ensureGlobalModule('karma');

  const environment = process.argv[3] || 'test';
  const args        = ['start', '--single-run'];
  let command       = 'karma';
  let testProcess;

  Logger.log(message.test.starting);

  if (process.platform === 'win32') {
    args.unshift(command, '/c');
    command = process.env.comspec;
  }

  // TODO: Allow karma to run in production environment
  // In order to do this, we should not include webpack CommonsChunkPlugin
  // while running karma-webpack since they are incompatible

  testProcess = Utils.spawnProcess(command, args, environment, { inherit: true });
  testProcess.on('exit', () => Logger.done());
};
