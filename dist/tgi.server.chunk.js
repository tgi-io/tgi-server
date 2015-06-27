/**---------------------------------------------------------------------------------------------------------------------
 * tgi.io/tgi-server/lib/tgi-server.lib.js
 */
TGI.SERVER = function () {
  return {
    version: '0.0.2',
    Server: Server
  };
};

/**---------------------------------------------------------------------------------------------------------------------
 * tgi.io/tgi-server/lib/tgi-server.source.js
 */

/**
 * Constructor Function
 */
var Server = function (args) {
  if (false === (this instanceof Server)) throw new Error('new operator required');
  args = args || {};
  if (!args.attributes) {
    args.attributes = [];
  }
  args.attributes.push(new Attribute({name: 'name', type: 'String(50)'}));
  if (args.interface) {
    this.setInterface(args.interface);
    delete args.interface;
  }
  Model.call(this, args);
  this.modelType = "Server";
  this.set('name', 'Node Server');
};
Server.prototype = Object.create(Model.prototype);