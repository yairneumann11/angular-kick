var fs            = require('fs-extra');
var kick          = 'node ' + __dirname + '/../../bin/kick ';
var child_process = require('child_process');

describe('$ kick help', function () {

  beforeAll(function () {
    fs.deleteSync('npm_test');
    child_process.execSync(kick + 'new npmTest -ns');
    process.chdir('npm_test');
  });

  afterAll(function () {
    process.chdir('..');
    fs.deleteSync('npm_test');
  });

  it('should output help', function () {
    var output = child_process.execSync(kick + 'help').toString();

    expect(output).toMatch("Available commands");
  });
});
