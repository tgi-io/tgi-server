/**---------------------------------------------------------------------------------------------------------------------
 * tgi.io/tgi-server/lib/tgi-server.spec.js
 */
/**
 * Doc Intro
 */
spec.test('lib/tgi-server.spec.js', 'Node Server', '', function (callback) {
  spec.heading('CONSTRUCTOR', function () {
    spec.example('objects created should be an instance of Server', true, function () {
      return new Server() instanceof Server;
    });
    spec.testModel(Server);
    //spec.example('argument property interface will invoke setInterface method', true, function () {
    //  var myInterface = new Interface();
    //  var myServer = new Server({interface: myInterface});
    //  return (myServer.getInterface() === myInterface);
    //});

  });
  spec.heading('ATTRIBUTES', function () {
    spec.paragraph('Server extends model and inherits the attributes property.  All Server objects ' +
      'have the following attributes:');
    spec.xexample('following attributes are defined:', undefined, function () {
      var presentation = new Server(); // default attributes and values
      this.shouldBeTrue(presentation.get('name') === 'newApp');
    });
  });
  spec.heading('METHODS', function () {
  });
});
