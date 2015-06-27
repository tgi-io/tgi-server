/**---------------------------------------------------------------------------------------------------------------------
 * tgi-store-json-file/spec/node-runner.js
 */
var Spec = require('tgi-spec/dist/tgi.spec.js');
var testSpec = require('../dist/tgi-server.spec.js');
var TGI = require('../dist/tgi-server.js');
var _package = require('../package');

if (_package.version != TGI.SERVER().version) {
  console.error('Library version %s does not match package.json %s', TGI.SERVER().version, _package.version);
  process.exit(1);
}

var spec = new Spec();
testSpec(spec, TGI);
spec.runTests(function (msg) {
  if (msg.error) {
    console.log('UT OH: ' + msg.error);
    process.exit(1);
  } else if (msg.done) {
    console.log('Testing completed with  ...');
    console.log('testsCreated = ' + msg.testsCreated);
    console.log('testsPending = ' + msg.testsPending);
    console.log('testsFailed = ' + msg.testsFailed);
    if (msg.testsFailed || msg.testsPending)
      process.exit(1);
    else
      process.exit(0);
  } else if (msg.log) {
    //console.log(msg.log);
  }
});
