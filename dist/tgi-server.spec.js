/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/_packaging/spec-header
 **/
(function () {
"use strict";
var root = this;
var testSpec = function(spec,TGI) {
  var tgiCore = TGI.CORE();
  var Application = tgiCore.Application;
  var Attribute = tgiCore.Attribute;
  var Command = tgiCore.Command;
  var Delta = tgiCore.Delta;
  var Interface = tgiCore.Interface;
  var List = tgiCore.List;
  var Log = tgiCore.Log;
  var MemoryStore = tgiCore.MemoryStore;
  var Message = tgiCore.Message;
  var Model = tgiCore.Model;
  var Presentation = tgiCore.Presentation;
  var Procedure = tgiCore.Procedure;
  var REPLInterface = tgiCore.REPLInterface;
  var Request = tgiCore.Request;
  var Session = tgiCore.Session;
  var Store = tgiCore.Store;
  var Transport = tgiCore.Transport;
  var User = tgiCore.User;
  var Workspace = tgiCore.Workspace;
  var inheritPrototype = tgiCore.inheritPrototype;
  var getInvalidProperties = tgiCore.getInvalidProperties;
  var trim = tgiCore.trim;
  var ltrim = tgiCore.ltrim;
  var rtrim = tgiCore.rtrim;
  var left = tgiCore.left;
  var center = tgiCore.center;
  var right = tgiCore.right;
  var lpad = tgiCore.lpad;
  var rpad = tgiCore.rpad;
  var cpad = tgiCore.cpad;
  var contains = tgiCore.contains;

/**---------------------------------------------------------------------------------------------------------------------
 * tgi.io/tgi-server/lib/_packaging/spec-header
 **/
  var Server = TGI.SERVER().Server;
  spec.mute(true);
/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core.spec.js
 **/
spec.test('lib/tgi-spec-intro', 'tgi-core', 'Core Repository', function (callback) {
  spec.paragraph('Core constructors, models, stores and interfaces.  The constructor functions define the object ' +
  '"classes" used by the framework.  The Model Constructor is a key part of the core that defines the system ' +
  'functionality for the framework.  The framework is further extended with a Store and Interface abstract that ' +
  'provides data store and user interface plugins.');
  spec.example('TGI.CORE function exposes library', undefined, function () {
    this.log(TGI.CORE().version);
  });
  spec.index('##Constructors');
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core-attribute.spec.js
 */
spec.test('tgi-core/lib/tgi-core-attribute.spec.js', 'Attribute', 'defines data types - needed by Model', function (callback) {
    spec.paragraph('Attributes are the means for models to represent data of different types.  They have no' +
    ' dependencies on Models however and can be used without creating a model.');
    spec.heading('CONSTRUCTOR', function () {
      spec.example('objects created should be an instance of Attribute', true, function () {
        return new Attribute({name: 'name'}) instanceof Attribute;
      });
      spec.example('should make sure new operator used', Error('new operator required'), function () {
        Attribute({name: 'name'}); // jshint ignore:line
      });
      spec.example('should make sure properties are valid', Error('error creating Attribute: invalid property: sex'), function () {
        new Attribute({name: 'name', sex: 'female'});
      });
      spec.example('should validate and throw errors before returning from constructor', Error('error creating Attribute: multiple errors'), function () {
        new Attribute({eman: 'the'}); // 2 errors: name missing and eman an unknown property
      });
      spec.heading('Attribute.ModelID', function () {
        spec.paragraph('Attribute.ModelID is a constructor that is used as a special type for references to IDs in external models.' +
        '  Note it is a function embedded as a member of the Attribute to encapsulate it.');
        spec.example('objects created should be an instance of Attribute.ModelID', true, function () {
          return new Attribute.ModelID(new Model()) instanceof Attribute.ModelID;
        });
        spec.example('should make sure new operator used', Error('new operator required'), function () {
          Attribute.ModelID();
        });
        spec.example('constructor must pass instance of model', Error('must be constructed with Model'), function () {
          new Attribute.ModelID();
        });
        spec.example('value is set to value of ID in constructor', 123, function () {
          var model = new Model();
          model.set('id', 123);
          return new Attribute.ModelID(model).value;
        });
        spec.example('constructorFunction is set to constructor of model', true, function () {
          var model = new Model();
          model.set('id', 123);
          var attrib = new Attribute.ModelID(model);
          var newModel = new attrib.constructorFunction();
          return newModel instanceof Model;
        });
        spec.example('modelType is set from model in constructor', 'Model', function () {
          return new Attribute.ModelID(new Model()).modelType;
        });
        spec.example('toString is more descriptive', "ModelID(Model:123)", function () {
          var model = new Model();
          model.set('id', 123);
          return new Attribute.ModelID(model).toString();
        });
      });
    });
    spec.heading('PROPERTIES', function () {
      spec.heading('name', function () {
        spec.example('should be required', Error('error creating Attribute: name required'), function () {
          new Attribute();
        });
        spec.example('should allow shorthand string constructor for name property', 'Attribute: favoriteActorName', function () {
          return new Attribute('favoriteActorName');
        });
      });
      spec.heading('type', function () {
        spec.example("should default to 'String'", 'String', function () {
          return new Attribute({name: 'name'}).type;
        });
        spec.example('should be a valid attribute type', Error('error creating Attribute: Invalid type: Dude'), function () {
          this.log(Attribute.getTypes());
          new Attribute({name: 'Bogus', type: "Dude"});
        });
        spec.example('should allow shorthand string constructor for type property', 'Date', function () {
          return new Attribute('favoriteActorBorn', 'Date').type;
        });
      });
      spec.heading('label', function () {
        spec.example('should default to name property capitalized', 'Name', function () {
          return new Attribute({name: 'name'}).label;
        });
        spec.example('should be optional in constructor', 'Name', function () {
          return new Attribute({name: 'name', label: 'Name'}).label;
        });
      });
      spec.heading('placeHolder', function () {
        spec.example('pass through to Interface used as visual cue to user for input', '###-##-####', function () {
          return new Attribute({name: 'ssn', placeHolder: '###-##-####'}).placeHolder;
        });
      });
      spec.heading('hint', function () {
        spec.paragraph('hint properties give guidance in handling of the attribute');
        spec.example('initialized to empty object', 'object', function () {
          return typeof new Attribute({name: 'name', label: 'Name'}).hint;
        });
      });
      spec.heading('quickPick', function () {
        spec.example('list of values to pick from typically invoked from dropdown', 3, function () {
          return new Attribute({name: 'stooge', quickPick: ['moe', 'larry', 'curly']}).quickPick.length;
        });
      });
      spec.heading('validationErrors', function () {
        spec.example('Array of errors', undefined, function () {
          this.shouldBeTrue(new Attribute({name: 'name'}).validationErrors instanceof Array);
          this.shouldBeTrue(new Attribute({name: 'name'}).validationErrors.length === 0);
        });
      });
      spec.heading('validationMessage', function () {
        spec.example('string description of error(s) is empty string (falsy) when no errors', '""', function () {
          var errs = new Attribute({name: 'name'}).validationMessage;
          this.shouldBeFalsy(errs);
          return cpad(errs,2,'"');
        });
      });
      spec.heading('validationRule', function () {
        spec.paragraph('The validationRule property provides validation rules for attribute.' +
        '  For additional validation see the *Validate* event in onEvent method.');
        spec.example('initialized to empty object', 'object', function () {
          return typeof new Attribute({name: 'name'}).validationRule;
        });
        spec.example('can be passed to constructor', undefined, function () {
          new Attribute({name: 'name', validationRule: {}});
        });
        spec.example('validation rule is validated', Error('error creating Attribute: invalid validationRule: age'), function () {
          new Attribute({name: 'name', validationRule: {age: 18, required: true}});
        });
        spec.heading('validationRule.required', function () {
          spec.paragraph('validationRule.required is used when a value is required for attribute');
          spec.example('validationRule.required', spec.asyncResults('Name required'), function (callback) {
            var a = new Attribute({name: 'name', validationRule: {required: true}});
            a.validate(function () {
              callback(a.validationErrors);
            });
          });
          spec.example('validationRule.required for Number allows 0', spec.asyncResults(0), function (callback) {
            var a = new Attribute({name: 'balance', type: 'Number', value: 0, validationRule: {required: true}});
            a.validate(function () {
              callback( a.validationErrors.length);
            });
          });
          spec.example('validationRule.required for Boolean allows false', spec.asyncResults(0), function (callback) {
            var a = new Attribute({name: 'active', type: 'Boolean', value: false, validationRule: {required: true}});
            a.validate(function () {
              callback( a.validationErrors.length);
            });
          });
        });
        spec.heading('validationRule.range', function () {
          spec.paragraph('validationRule.range is used when value must fall within a range of values- use null to omit bound');
          spec.example('validationRule.range lower bound only', spec.asyncResults('Age must be at least 18'), function (callback) {
            var a = new Attribute({name: 'age', type: 'Number', value: 17, validationRule: {range: [18, null]}});
            a.validate(function () {
              callback( a.validationErrors[0]);
            });
          });
          spec.example('validationRule.range upper bound only', spec.asyncResults('Age must be no more than 65'), function (callback) {
            var a = new Attribute({name: 'age', type: 'Number', value: 77, validationRule: {range: [null, 65]}});
            a.validate(function () {
              callback( a.validationErrors[0]);
            });
          });
          spec.example('validationRule.range pass', spec.asyncResults(0), function (callback) {
            var a = new Attribute({name: 'age', type: 'Number', value: 53, validationRule: {range: [18, 65]}});
            a.validate(function () {
              callback( a.validationErrors.length);
            });
          });
          spec.example('validationRule.range forced to array', spec.asyncResults('Age must be at least 100'), function (callback) {
            var a = new Attribute({name: 'age', type: 'Number', value: 53, validationRule: {range: 100}});
            a.validate(function () {
              callback( a.validationErrors);
            });
          });
        });
        spec.heading('validationRule.isOneOf', function () {
          spec.paragraph('validationRule.isOneOf is used when a value is must be on of items in array');

          spec.example('validationRule.isOneOf fail', spec.asyncResults('Age invalid'), function (callback) {
            var a = new Attribute({name: 'age', type: 'Number', value: 2, validationRule: {isOneOf: [1, 3]}});
            a.validate(function () {
              callback( a.validationErrors[0]);
            });
          });
          spec.example('validationRule.isOneOf pass', spec.asyncResults(0), function (callback) {
            var a = new Attribute({name: 'age', type: 'Number', value: 1, validationRule: {isOneOf: [1, 3]}});
            a.validate(function () {
              callback( a.validationErrors.length);
            });
          });
        });

      });
      spec.heading('value', function () {
        spec.example('should accept null assignment', undefined, function () {
          var myTypes = Attribute.getTypes();
          var record = '';
          for (var i = 0; i < myTypes.length; i++) {
            record += myTypes[i] + ':' + new Attribute({name: 'my' + myTypes[i]}).value + ' ';
          }
          this.log(record);
          // It's the default and it passes constructor validation
        });
        spec.example('should accept assignment of correct type and validate incorrect attributeTypes',
          '7 correct assignments 91 errors thrown', function () {
            // Test all known attribute types
            var myTypes = Attribute.getTypes();
            myTypes.shift(); // not testing ID
            myTypes.pop(); // not testing Object since it matches other types
            this.log(myTypes);

            // Now create an array of matching values for each type into myValues
            var myModel = new Model();
            var myGroup = new Attribute({name: 'columns', type: 'Group', value: [new Attribute("Name")]});
            var myTable = new Attribute({name: 'bills', type: 'Table', group: myGroup});
            var myValues = ['Jane Doe', new Date(), true, 18, new Attribute.ModelID(new Model()), [], myTable];

            // Loop thru each type
            var theGood = 0;
            var theBad = 0;
            for (var i = 0; i < myTypes.length; i++)
              for (var j = 0; j < myValues.length; j++) {
                // for the value that works it won't throw error just create and to test
                if (i === j) {
                  theGood++;
                  switch (myTypes[i]) {
                    case 'Table':
                      new Attribute({name: 'my' + myTypes[i], type: myTypes[i], value: myValues[j], group: myGroup});
                      break;
                    default:
                      new Attribute({name: 'my' + myTypes[i], type: myTypes[i], value: myValues[j]});
                      break;
                  }
                } else {
                  // mismatches bad so should throw error (is caught unless no error or different error)
                  theBad++;
                  // NOTE: functions in loops are terrible code practices - except in dorky test cases
                  this.shouldThrowError('*', function () { // jshint ignore:line
                    new Attribute({name: 'my' + myTypes[i], type: myTypes[i], value: myValues[j]});
                  });// jshint ignore:line
                }
                // other objects should throw always
                theBad++;
                this.shouldThrowError('*', function () { // jshint ignore:line
                  new Attribute({name: 'my' + myTypes[i], type: myTypes[i], value: {}});
                }); // jshint ignore:line
              }
            return theGood + ' correct assignments ' + theBad + ' errors thrown';
          });
      });
    });
    spec.heading('TYPES', function () {
      spec.heading('ID', function () {
        spec.example("should have type of 'ID'", 'ID', function () {
          return new Attribute({name: 'CustomerID', type: 'ID'}).type;
        });
      });
      spec.heading('String', function () {
        spec.example("should have type of 'String'", 'String', function () {
          return new Attribute({name: 'Cheese', type: 'String'}).type;
        });
        spec.example('should have size property', 10, function () {
          // Note: size property is not "enforced" but for formatting purposes
          return new Attribute({name: 'zipCode', size: 10}).size;
        });
        spec.example('size should default to 50', 50, function () {
          return new Attribute({name: 'stuff'}).size;
        });
        spec.example('size should be an integer', Error('error creating Attribute: size must be a number from 1 to 255'), function () {
          new Attribute({name: 'zipCode', size: "10"});
        });
        spec.example('size should be between 1 and 255', undefined, function () {
          this.shouldThrowError(Error('error creating Attribute: size must be a number from 1 to 255'), function () {
            new Attribute({name: 'partyLikeIts', size: 1999});
          });
          this.shouldThrowError(Error('error creating Attribute: size must be a number from 1 to 255'), function () {
            new Attribute({name: 'iGotNothing', size: 0});
          });
        });
        spec.example('size should accept format shorthand with parens', 255, function () {
          return new Attribute({name: 'comments', type: 'String(255)'}).size;
        });
      });
      spec.heading('Number', function () {
        spec.example("type should be 'Number'", 'Number', function () {
          return new Attribute({name: 'healthPoints', type: 'Number'}).type;
        });
      });
      spec.heading('Date', function () {
        spec.example("type should be 'Date'", 'Date', function () {
          return new Attribute({name: 'born', type: 'Date'}).type;
        });
      });
      spec.heading('Boolean', function () {
        spec.example("type should be 'Boolean'", 'Boolean', function () {
          return new Attribute({name: 'bored', type: 'Boolean'}).type;
        });
      });
      spec.heading('Model', function () {
        spec.paragraph('Parameter type Model is used to store a reference to another model instance.  ' +
        'The value attribute is a Attribute.ModelID reference to the Model.');

        spec.example('must construct with Attribute.ModelID in value', Error('error creating Attribute: value must be Attribute.ModelID'), function () {
          new Attribute({name: 'Twiggy', type: 'Model'});
        });
        spec.example("modelType property set from constructor", 'Model', function () {
          return new Attribute(
            {
              name: 'Twiggy',
              type: 'Model',
              value: new Attribute.ModelID(new Model())
            }).modelType;
        });
      });
      spec.heading('Group', function () {
        spec.paragraph('Groups are used to keep attributes together for presentation purposes.');
        spec.example("should have type of 'Group'", 'Group', function () {
          return new Attribute({name: 'stuff', type: 'Group'}).type;
        });
        spec.example('deep check value for valid Attributes that pass getObjectStateErrors() test', 1, function () {
          // this example is just to conceptualize nested components
          var myStuff = new Attribute("stuff", "Group");
          var myCars = new Attribute("cars", "Group");
          var myFood = new Attribute("food", "Group");
          var myFruit = new Attribute("fruit", "Group");
          var myVegs = new Attribute("vegetables", "Group");
          var badApple = new Attribute('Apple');
          myCars.value = [new Attribute('Nova'), new Attribute('Pinto')];
          myFruit.value = [badApple, new Attribute('Peach')];
          myVegs.value = [new Attribute('Carrot'), new Attribute('Beet')];
          myFood.value = [myFruit, myVegs];
          myStuff.value = [myFood, myCars, new Attribute('House'), new Attribute('Health')];
          this.log(myStuff.getObjectStateErrors());
          badApple.value = -1; // One bad apple will spoil my stuff
          this.log(myStuff.getObjectStateErrors());
          return myStuff.getObjectStateErrors().length;
        });
      });
      spec.heading('Table', function () {
        spec.paragraph("Table types are used to store an array of values (rows) each of which is an array of " +
          "values (columns).  Each column value is associated with the corresponding element in the Table " +
          "property group which is set when creating a Table."
        );
        spec.example("should have type of 'Table'", 'Table', function () {
          var name = new Attribute("Name");
          var cols = new Attribute({name: 'columns', type: 'Group', value: [name]});
          return new Attribute({name: 'bills', type: 'Table', group: cols}).type;
        });
        spec.example("group property must be defined", Error('error creating Attribute: group property required'),
          function () {
            new Attribute({name: 'details', type: 'Table'});
          });
        spec.example("group property must not be empty array",
          Error('error creating Attribute: group property value must contain at least one Attribute'), function () {
            var cols = new Attribute({name: 'columns', type: 'Group', value: []});
            new Attribute({name: 'details', type: 'Table', group: cols});
          });
      });
      spec.heading('Object', function () {
        spec.paragraph('Javascript objects ... structure user defined');
        spec.example("should have type of 'Object'", 'Object', function () {
          return new Attribute({name: 'stuff', type: 'Object'}).type;
        });
      });
    });
    spec.heading('METHODS', function () {
      spec.heading('toString()', function () {
        spec.example('should return a description of the attribute', 'Attribute: name', function () {
          return new Attribute({name: 'name'}).toString();
        });
      });
      spec.heading('coerce(newValue)', function () {
        spec.paragraph('Method returns the type equivalent of newValue for the owner objects type.');
        spec.example('coerce method basic usage', undefined, function () {
          var myString = new Attribute({name: 'name', size: 10});
          var myNumber = new Attribute({name: 'age', type: 'Number'});
          var myBool = new Attribute({name: 'active', type: 'Boolean'});
          var myDate = new Attribute({name: 'date', type: 'Date'});
          var myGroup = new Attribute({name: 'columns', type: 'Group', value: [new Attribute("Name")]});
          var myTable = new Attribute({name: 'bills', type: 'Table', group: myGroup});

          // Strings
          this.shouldBeTrue(myString.coerce() === '');
          this.shouldBeTrue(myString.coerce(false) === 'false');
          this.shouldBeTrue(myString.coerce(12) === '12');
          this.shouldBeTrue(myString.coerce(1 / 0) === 'Infinity');
          this.shouldBeTrue(myString.coerce('01234567890') === '0123456789');
          this.shouldBeTrue(myString.coerce() === '');
          // Numbers
          this.shouldBeTrue(myNumber.coerce() === 0);
          this.shouldBeTrue(myNumber.coerce(false) === 0);
          this.shouldBeTrue(myNumber.coerce(true) === 1);
          this.shouldBeTrue(myNumber.coerce(' 007 ') === 7);
          this.shouldBeTrue(myNumber.coerce(' $123,456.78 ') === 123456.78);
          this.shouldBeTrue(myNumber.coerce(' $123, 456.78 ') === 123); // space will split
          this.shouldBeTrue(myNumber.coerce('4/20') === 0); // slash kills it
          // Boolean
          this.shouldBeTrue(myBool.coerce() === false && myBool.coerce(null) === false && myBool.coerce(0) === false);
          this.shouldBeTrue(myBool.coerce(true) === true && myBool.coerce(1) === true);
          this.shouldBeTrue(myBool.coerce('y') && myBool.coerce('yEs') && myBool.coerce('t') && myBool.coerce('TRUE') && myBool.coerce('1'));
          this.shouldBeTrue(!((myBool.coerce('') || (myBool.coerce('yep')))));
          //// Date {todo this will break in 2016}
          this.shouldBeTrue(myDate.coerce('2/21/2015').getTime() === new Date('2/21/2015').getTime());
          this.shouldBeTrue(myDate.coerce('2/21').getTime() === new Date('2/21/2015').getTime());

          // TODO
          this.shouldThrowError(Error('coerce cannot determine appropriate value'), function () {
            new Attribute({name: 'Twiggy', type: 'Model', value: new Attribute.ModelID(new Model())}).coerce();
          });
          this.shouldThrowError(Error('coerce cannot determine appropriate value'), function () {
            new Attribute(myGroup.coerce());
          });
          this.shouldThrowError(Error('coerce cannot determine appropriate value'), function () {
            new Attribute(myTable.coerce());
          });
        });
      });
      spec.heading('getObjectStateErrors', function () {
        spec.example('should return array of validation errors', undefined, function () {
          this.shouldBeTrue(new Attribute({name: 'name'}).getObjectStateErrors() instanceof Array);
          var nameHosed = new Attribute({name: 'name'}); // No errors
          this.shouldBeTrue(nameHosed.getObjectStateErrors().length === 0);
          nameHosed.name = ''; // 1 err
          this.shouldBeTrue(nameHosed.getObjectStateErrors().length === 1);
          nameHosed.type = ''; // 2 errors
          this.shouldBeTrue(nameHosed.getObjectStateErrors().length === 2);
        });
      });
      spec.heading('onEvent', function () {
        spec.paragraph('Use onEvent(events,callback)');
        spec.example('first parameter is a string or array of event subscriptions', Error('subscription string or array required'), function () {
          new Attribute({name: 'name'}).onEvent();
        });
        spec.example('callback is required', Error('callback is required'), function () {
          new Attribute({name: 'name'}).onEvent([]);
        });
        spec.example('events are checked against known types', Error('Unknown command event: onDrunk'), function () {
          new Attribute({name: 'name'}).onEvent(['onDrunk'], function () {
          });
        });
        spec.example('here is a working version', undefined, function () {
          this.log(Attribute.getEvents());
          // Validate - callback when attribute needs to be validated
          // StateChange -- callback when state of object (value or validation state) has changed
          new Attribute({name: 'name'}).onEvent(['Validate'], function () {
          });
        });
      });
      spec.heading('validate', function () {
        spec.paragraph('check valid object state and value for attribute - invoke callback for results');
        spec.example('callback is required', Error('callback is required'), function () {
          new Attribute({name: 'name'}).validate();
        });
      });
      spec.heading('setError', function () {
        spec.paragraph('Set a error condition and descriptive message');
        spec.example('first argument condition required', Error('condition required'), function () {
          new Attribute({name: 'status'}).setError();
        });
        spec.example('second argument description required', Error('description required'), function () {
          new Attribute({name: 'status'}).setError('login');
        });
      });
      spec.heading('clearError', function () {
        spec.paragraph('Clear a error condition');
        spec.example('first argument condition required', Error('condition required'), function () {
          new Attribute({name: 'status'}).clearError();
        });
      });
      spec.heading('Attribute.getTypes', function () {
        spec.paragraph('This helper function returns an array of valid Attribute types.  This is just a function - not a prototype method.');
        spec.example('show the types', undefined, function () {
          this.log(Attribute.getTypes());
        });
      });
      spec.heading('Attribute.getEvents', function () {
        spec.paragraph('This helper function returns an array of valid Attribute events.  This is just a function - not a prototype method.');
        spec.example('show the events', undefined, function () {
          this.log(Attribute.getEvents());
        });
      });

    });
    spec.heading('INTEGRATION', function () {
      spec.example('validation usage demonstrated', spec.asyncResults('got milk'), function (callback) {
        var thisCrap = this;
        var attribute = new Attribute({name: 'test'});

        // Monitor state changes
        attribute.onEvent('StateChange', function () {
          // When the error is got milk then test is done
          if (attribute.validationMessage === 'got milk')
            callback( 'got milk');
        });

        // validate will first make sure the object passes integrity checks
        attribute.name = '';
        attribute.validate(test1);

        // verify error seen
        function test1() {
          thisCrap.shouldBeTrue(attribute.validationMessage == 'name required');
          // Create a validation rule - value must be equal to 42
          attribute.onEvent('Validate', function () {
            if (attribute.value !== 42)
              attribute.validationErrors.push('Incorrect answer');
          });
          attribute.validate(test2);
        }

        // same error in message
        function test2() {
          thisCrap.shouldBeTrue(attribute.validationMessage == 'name required');
          attribute.name = 'answer';
          attribute.validate(test3);
        }

        // Now validation function error is shown
        function test3() {
          thisCrap.shouldBeTrue(attribute.validationMessage == 'Incorrect answer');
          // Fix everything
          attribute.value = 42;
          attribute.validate(test4);
        }

        // Type is wrong
        function test4() {
          thisCrap.shouldBeTrue(attribute.validationMessage == 'value must be null or a String');
          // Fix type
          attribute.type = 'Number';
          attribute.validate(test5);
        }

        // Should have no errors
        function test5() {
          thisCrap.shouldBeTrue(attribute.validationMessage === '');
          attribute.setError('uno', 'uno failed');
          attribute.setError('milk', 'and cookies');
          attribute.setError('milk', 'got milk'); // test overwrite of same condition diff msg
          attribute.validate(test6);
        }

        // now error is first set error
        function test6() {
          thisCrap.shouldBeTrue(attribute.validationMessage == 'uno failed');
          attribute.clearError('zzz'); // delete a prop that does not exists is silent
          attribute.clearError('uno');
          attribute.validate(function () {
            //
          });
        }
      });
    });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core-command.spec.js
 */
spec.test('tgi-core/lib/tgi-core-command.spec.js', 'Command', 'encapsulates task execution', function (callback) {
  spec.paragraph('Command is an abstraction for task execution.  It provides multiple methods of task execution ' +
  'and manages the overall state of both synchronous and asynchronous processes. ' +
  'The primary use is to have a simple API method to respond to UI tasks. ' +
  'It can be used for processing / validation / storage / reporting type of use cases since ' +
  'it handles the asynchronous nature of javascript and abstracts in a way to easily incorporate application logic.');
  spec.heading('CONSTRUCTOR', function () {
    spec.example('objects created should be an instance of Command', true, function () {
      return new Command({name: 'about'}) instanceof Command;
    });
    spec.example('should make sure new operator used', Error('new operator required'), function () {
      Command({name: 'about'}); // jshint ignore:line
    });
    spec.example('should make sure argument properties are valid', Error('error creating Command: invalid property: sex'), function () {
      new Command({name: 'name', sex: 'female'});
    });
    spec.example('defaults name to a command', 'a command', function () {
      return new Command().name;
    });
    spec.example('defaults type to Stub', 'Stub', function () {
      return new Command({name: 'about'}).type;
    });
  });
  spec.heading('PROPERTIES', function () {
    spec.heading('name', function () {
      spec.example('identifier name for command', 'about', function () {
        this.shouldThrowError(Error('name must be string'), function () {
          new Command({name: 42});
        });
        return new Command({name: 'about'}).name;
      });
    });
    spec.heading('description', function () {
      spec.example('more descriptive than name', 'Tequila Command : Tequila is a beverage made from blue agave.', function () {
        // description set to (name) Command if not specified
        return new Command({name: 'Tequila'}).description + ' : ' +
          new Command({name: 'tequila', description: 'Tequila is a beverage made from blue agave.'}).description;
      });
    });
    spec.heading('type', function () {
      spec.example('type of command must be valid', Error('Invalid command type: magic'), function () {
        this.log(Command.getTypes());
        new Command({name: 'about', type: 'magic'});
      });
    });
    spec.heading('contents', function () {
      spec.paragraph('Contents is based on the type of command.  See TYPE section for more information for how it ' +
      'applies to each type');
    });
    spec.heading('scope', function () {
      spec.paragraph('Optional scope property can be used to apply a model or list to a command.');
      spec.example('scope must be a Model or a List', Error('optional scope property must be Model or List'), function () {
        new Command({name: 'archiveData', scope: true});
      });
    });
    spec.heading('status', function () {
      spec.paragraph('The status property is a Number defined as negative(FAIL) positive(SUCCESS) zero(executing) ' +
      'null/undefined(not executing).');
      spec.paragraph('Applications can give meaning to numeric values (lt -1 and gt 1) as long as sign is retained.');
    });
    spec.heading('timeout', function () {
      spec.paragraph('Will use library setting as default, override to set the default timeout for steps used in ' +
      'procedures. Value is milliseconds (1000 = 1 second)');
      spec.example('number required', Error('timeout must be a Number'), function () {
        new Command({name: 'options', timeout: true});
      });
    });
    spec.heading('theme', function () {
      spec.paragraph('Valid themes listed in example.  These were inspired by bootstrap so fit that well and is' +
      ' optional for implementation but should follow if possible.  Example PDF is b/w and may ignore ot more likely' +
      ' will never apply.');
      spec.example('theme attribute provides visual cue', undefined, function () {
        // The good
        new Command({name: 'options', theme: 'default'});
        new Command({name: 'options', theme: 'primary'});
        new Command({name: 'options', theme: 'success'});
        new Command({name: 'options', theme: 'info'});
        new Command({name: 'options', theme: 'warning'});
        new Command({name: 'options', theme: 'danger'});
        new Command({name: 'options', theme: 'link'});
        // The bad
        this.shouldThrowError(Error('invalid theme'), function () {
          new Command({name: 'options', theme: 'Silly'});
        });
        // The ugly
        this.shouldThrowError(Error('invalid theme'), function () {
          new Command({name: 'options', theme: true});
        });
      });

    });
    spec.heading('icon', function () {
      spec.paragraph('The icon attribute gives a graphical association to the command.' +
      ' They are interface specific and do break the abstractness of this library but can be ignored by' +
      ' other interfaces safely.');
      spec.example('must be string and have prefix for 2 supported icon sets ' +
      'http://glyphicons.com/ http://fontawesome.io/', undefined, function () {

        this.shouldThrowError(Error('invalid icon'), function () {
          new Command({name: 'options', icon: true});
        });
        this.shouldThrowError(Error('invalid icon'), function () {
          new Command({name: 'options', icon: 'wtf-lol'});
        });
        // Only prefix is validated
        new Command({name: 'options', icon: 'fa-whatever'});
        new Command({name: 'options', icon: 'glyphicon-who-cares'});
        // Must have something to the right of the dash
        this.shouldThrowError(Error('invalid icon'), function () {
          new Command({name: 'options', icon: 'fa'});
        });
      });
    });
    spec.heading('location', function () {
      spec.example('optional for control location {x,y}', undefined, function () {
        new Command({name: 'options', location: {x: 0, y: 0}});
      });
    });
    spec.heading('images', function () {
      spec.example('optional for control graphical representation', undefined, function () {
        new Command({name: 'options', images: []});
      });
    });
    spec.heading('presentationMode', function () {
      spec.paragraph('this property is used for presentation commands to specify the mode of presentation');
      spec.example('default is View', 'View', function () {
        return new Command({type: 'Presentation', contents: new Presentation()}).presentationMode;
      });
      spec.example('can supply in constructor', 'Edit', function () {
        return new Command({
          type: 'Presentation',
          contents: new Presentation(),
          presentationMode: 'Edit'
        }).presentationMode;
      });
      spec.example('must be valid mode', Error('Invalid presentationMode: Projector'), function () {
        this.log(Command.getPresentationModes());
        new Command({type: 'Presentation', contents: new Presentation(), presentationMode: 'Projector'});
      });

    });
    spec.heading('bucket', function () {
      spec.example('valid property is for app use', 'bucket of KFC', function () {
        // no real test but library will never use this word in general (TODO expand somehow ... ?).
        return 'bucket of ' + new Command({bucket: 'KFC'}).bucket;
      });
    });
  });
  spec.heading('TYPES', function () {
    spec.heading('menu', function () {
      spec.paragraph('The menu command is passed to _Interface_ for use for in user navigation.  ' +
      'They are embedded in the _Application_ as the primary navigate but can be instantiated and given to ' +
      '_Interface_ in any context.');
      spec.paragraph('The _Command_ contents property is an array _Command_ objects.');
      spec.example('constructor validates the contents', undefined, function () {
        this.shouldThrowError(Error('contents must be array of menu items'), function () {
          new Command({name: 'options', type: 'Menu'});
        });
        this.shouldThrowError(Error('contents must be array of menu items'), function () {
          new Command({name: 'options', type: 'Menu', contents: []});
        });
        this.shouldThrowError(Error('contents must be array of menu items'), function () {
          new Command({name: 'options', type: 'Menu', contents: [42]});
        });
        // This is a working example:
        new Command({
          name: 'options', type: 'Menu', contents: [
            'Stooges',                      // strings act as menu titles or non selectable choices
            '-',                            // dash is menu separator
            new Command({name: 'Tequila'})  // use commands for actual menu items
          ]
        });
      });
    });
    spec.heading('Presentation', function () {
      spec.example('for Presentation type contents is a Presentation object', undefined, function () {
        this.shouldThrowError(Error('contents must be a Presentation'), function () {
          new Command({name: 'options', type: 'Presentation'});
        });
      });
    });
    spec.heading('Function', function () {
      spec.paragraph('contents contains a javascript function');
      spec.example('for Function type contents is a Function', undefined, function () {
        this.shouldThrowError(Error('contents must be a Function'), function () {
          new Command({name: 'options', type: 'Function'});
        });
      });
    });
    spec.heading('Procedure', function () {
      spec.example('for Procedure type contents is a Procedure object', undefined, function () {
        this.shouldThrowError(Error('contents must be a Procedure'), function () {
          new Command({name: 'options', type: 'Procedure'});
        });
      });
    });
  });
  spec.heading('METHODS', function () {
    spec.heading('toString', function () {
      spec.example('returns string including name and type', 'I am a Stub Command: Customer', function () {
        return 'I am a ' + new Command({name: 'Customer'});
      });
    });
    spec.heading('abort', function () {
      spec.paragraph('aborts task');
      spec.example('aborted command ends with error status', -1, function () {
        var cmd = new Command();
        cmd.abort();
        return cmd.status;
      });
    });
    spec.heading('complete', function () {
      spec.paragraph('completes task');
      spec.example('call when task complete status', 1, function () {
        var cmd = new Command();
        cmd.complete();
        return cmd.status;
      });
    });
    spec.heading('execute', function () {
      spec.paragraph('executes task');
      spec.example('see integration tests for usage', Error('command type Stub not implemented'), function () {
        new Command().execute();
      });
      spec.example('presentation commands require interface param', Error('interface param required'), function () {
        new Command({type: 'Presentation', contents: new Presentation()}).execute();
      });
    });
    spec.heading('restart', function () {
      spec.paragraph('restarts task');
      spec.example('see integration tests', Error('command type Stub not implemented'), function () {
        new Command().restart();
      });
    });
    spec.heading('onEvent', function () {
      spec.paragraph('Use onEvent(events,callback)');
      spec.example('first parameter is a string or array of event subscriptions', Error('subscription string or array required'), function () {
        new Command().onEvent();
      });
      spec.example('callback is required', Error('callback is required'), function () {
        new Command().onEvent([]);
      });
      spec.example('events are checked against known types', Error('Unknown command event: onDrunk'), function () {
        new Command().onEvent(['onDrunk'], function () {
        });
      });
      spec.example('here is a working version', undefined, function () {
        this.log(Command.getEvents());
        //  BeforeExecute - callback called before first task executed but after tasks initialized
        //  AfterExecute - callback called after initial task(s) launched (see onCompletion)
        //  Error - error occurred (return {errorClear:true})
        //  Aborted - procedure aborted - should clean up resources
        //  Completed - execution is complete check status property
        new Command().onEvent(['Completed'], function () {
        });
      });
    });
    spec.heading('Command.getTypes', function () {
      spec.paragraph('This helper function returns an array of valid Command types.  This is just a function - not a prototype method.');
      spec.example('show the types', undefined, function () {
        this.log(Command.getTypes());
      });
    });
    spec.heading('Command.getEvents', function () {
      spec.paragraph('This helper function returns an array of valid Command events.  This is just a function - not a prototype method.');
      spec.example('show the events', undefined, function () {
        this.log(Command.getEvents());
      });
    });
  });
  spec.heading('INTEGRATION', function () {
    spec.paragraph('test each command type');

    // Stub
    spec.example('Stub', Error('command type Stub not implemented'), function () {
      var cmd = new Command({
        name: 'stubCommand',
        description: 'stub command test',
        type: 'Stub'
      });
      this.log(cmd);
      cmd.execute();
    });

    // Menu todo - placeholder or not needed?
    spec.xexample('Menu', Error('command type Menu not implemented'), function () {
      var cmd = new Command({
        name: 'menuCommand',
        description: 'menu command test',
        type: 'Menu',
        contents: ['Hello World']
      });
      this.log(cmd);
      cmd.execute();
    });

    // Presentation
    spec.example('Presentation', undefined, function () {
      var cmd = new Command({
        name: 'presentationCommand',
        description: 'presentation command test',
        type: 'Presentation',
        contents: new Presentation()
      });
      this.shouldThrowError(Error('contents must be a Presentation'), function () {
        cmd.contents = 123;
        cmd.execute();
      });
      this.shouldThrowError(Error('error executing Presentation: contents elements must be Command, Attribute or string'), function () {
        cmd.contents = new Presentation();
        cmd.contents.set('contents', [new Command(), new Attribute({name: 'meh'}), true]);
        cmd.execute();
      });
    });

    // Function
    spec.example('Function test straight up', spec.asyncResults('Hola! BeforeExecute AfterExecute Adious! funk Completed BeforeExecute AfterExecute funk Completed'), function (callback) {
      var execCount = 0; // Call twice to test reset state

      var cmd = new Command({
        type: 'Function',
        contents: function () {
          this.bucket += ' funk';
          this.complete();
        }
      });
      cmd.bucket = 'Hola!';
      // Monitor all events
      cmd.onEvent(['BeforeExecute', 'AfterExecute', 'Error', 'Aborted', 'Completed'], function (event) {
        this.bucket += ' ' + event;
        if (event == 'Completed') {
          if (execCount++ < 2)
            cmd.execute();
          else
            callback(this.bucket);
        }
      });
      execCount++;
      cmd.execute();
      cmd.bucket += ' Adious!';
    });

    // Function error
    spec.example('Function test with error', spec.asyncResults('Hola! BeforeExecute AfterExecute Adious! funk Error Completed'), function (callback) {
      var cmd = new Command({
        type: 'Function',
        contents: function () {
          this.bucket += ' funk';
          throw new Error('function go boom!');
        }
      });
      cmd.bucket = 'Hola!';
      // Monitor all events
      cmd.onEvent('*', function (event) { // * for all events
        this.bucket += ' ' + event;
        if (event == 'Completed') callback(this.bucket);
      });
      cmd.execute();
      cmd.bucket += ' Adious!';
    });

    // Function abort
    spec.example('Function test with abort', spec.asyncResults('Hola! BeforeExecute AfterExecute Adious! funk Aborted Completed'), function (callback) {
      var cmd = new Command({
        type: 'Function',
        contents: function () {
          this.bucket += ' funk';
          this.abort();
        }
      });
      cmd.bucket = 'Hola!';
      // Monitor all events
      cmd.onEvent(['BeforeExecute', 'AfterExecute', 'Error', 'Aborted', 'Completed'], function (event) {
        this.bucket += ' ' + event;
        if (event == 'Completed') callback(this.bucket);
      });
      cmd.execute();
      cmd.bucket += ' Adious!';
    });

    // Procedure
    spec.example('Procedure', undefined, function () {
      var cmd = new Command({
        name: 'procedureCommand',
        description: 'procedure command test',
        type: 'Procedure',
        contents: new Procedure()
      });
      this.log(cmd);
      cmd.execute();
    });
    spec.paragraph('(Better example under `Procedure` Constructer)');
    spec.paragraph('More stuff');
    spec.example('Error event passes error object', spec.asyncResults('Error: boom'), function (callback) {
      var cmd = new Command({
        type: 'Function',
        contents: function () {
          throw new Error('boom');
        }
      });
      cmd.onEvent(['Error'], function (event, err) {
        callback(err);
      });
      cmd.execute();
    });

  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core-delta.spec.js
 */
spec.test('tgi-core/lib/tgi-core-delta.spec.js', 'Delta', 'represents changes to models', function (callback) {
  spec.paragraph('Deltas represent changes to models.  They can be applied to a store then update the model.  ' +
  'They can be stored in logs as a change audit for the model.');
  spec.heading('CONSTRUCTOR', function () {
    spec.example('objects created should be an instance of Delta', true, function () {
      return new Delta(new Attribute.ModelID(new Model())) instanceof Delta;
    });
    spec.example('should make sure new operator used', Error('new operator required'), function () {
      Delta(); // jshint ignore:line
    });
    spec.example('Attribute.ModelID required in constructor', Error('Attribute.ModelID required in constructor'), function () {
      new Delta();
    });
  });
  spec.heading('PROPERTIES', function () {
    spec.heading('dateCreated', function () {
      spec.example('set to current date/time on creation', true, function () {
        var delta = new Delta(new Attribute.ModelID(new Model()));
        this.log(delta.dateCreated);
        return delta.dateCreated instanceof Date;
      });
    });
    spec.heading('modelID', function () {
      spec.example('set from constructor', "ModelID(Model:null)", function () {
        var delta = new Delta(new Attribute.ModelID(new Model()));
        this.log(delta.dateCreated);
        return delta.modelID.toString();
      });
    });
    spec.heading('attributeValues', function () {
      spec.example('created as empty object', 'object', function () {
        // attributeValues - {attribute:[before,after]}  before and after attribute values represent the model
        // attribute value changes. If the model attribute is type Table then attributeValues is array of
        // attributeValues corresponding to model -> attribute -> group....
        return typeof new Delta(new Attribute.ModelID(new Model())).attributeValues;
      });
    });
  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core-interface.spec.js
 */
spec.test('tgi-core/lib/tgi-core-interface.spec.js', 'Interface', 'enable user to communicate with app', function (callback) {
  spec.paragraph('The Interface core constructor is a prototype for user or system interaction with the application.' +
  ' The SurrogateInterface is a reference to Interface being tested in the suite.');
  spec.heading('CONSTRUCTOR', function () {
    spec.runnerInterfaceConstructor(Interface);
  });
  spec.runnerInterfaceMethods(Interface);
});
spec.runnerInterfaceConstructor = function (SurrogateInterface) {
  if (new SurrogateInterface().description == 'a REPLInterface') {
    spec.paragraph('see `Interface` for documentation');
    spec.mute(true);
  }
  spec.example('objects created should be an instance of Interface', true, function () {
    var i = new SurrogateInterface();
    return (i instanceof SurrogateInterface) && (i instanceof Interface);
  });
  spec.example('should make sure new operator used', Error('new operator required'), function () {
    SurrogateInterface(); // jshint ignore:line
  });
  spec.example('should make sure argument properties are valid', Error('error creating Interface: invalid property: yo'), function () {
    new SurrogateInterface({yo: 'whatup'});
  });
  spec.example('allowable properties', undefined, function () {
    new SurrogateInterface({name: 'pen', description: 'old school', vendor: Object}); // Vendor is reference needed vendor liblib
  });

};
spec.runnerInterfaceMethods = function (SurrogateInterface) {
  spec.heading('PROPERTIES', function () {
    spec.heading('name', function () {
      spec.example('defaults to (unnamed)', '(unnamed)', function () {
        return new SurrogateInterface().name;
      });
    });
    spec.heading('description', function () {
      spec.example('defaults to Interface implementation', undefined, function () {
        this.log(new SurrogateInterface().description);
      });
    });
  });
  spec.heading('METHODS', function () {
    spec.heading('toString()', function () {
      spec.example('should return a description of the message', 'Punched Card Interface', function () {
        return new SurrogateInterface({description: 'Punched Card Interface'}).toString();
      });
    });
    spec.heading('start()', function () {
      spec.paragraph('The start method initiates the interface and passes a callback for the interface to submit requests. ' +
      'The callback must pass a Request object followed by an optional callback for responses to the request e.g. ' +
      'interface.start ( function ( request, response(callback) ) ) {}');
      spec.example('Application parameter is required', Error('Application required'), function () {
        new SurrogateInterface().start();
      });
      spec.example('presentation parameter is required', Error('presentation required'), function () {
        new SurrogateInterface().start(new Application());
      });
      spec.example('callback parameter required', Error('callback required'), function () {
        new SurrogateInterface().start(new Application(), new Presentation());
      });
    });
    spec.heading('stop()', function () {
      spec.paragraph('calling stop will end the start() processing and release any resources');
      spec.example('must pass callback function', Error('callback required'), function () {
        new SurrogateInterface().stop();
      });
    });
    spec.heading('dispatch()', function () {
      spec.paragraph('The dispatch method will accept a request and act on it or pass it to the app.');
      spec.example('must pass a Request object', Error('Request required'), function () {
        new SurrogateInterface().dispatch();
      });
      spec.example('send command without callback when no response needed', undefined, function () {
        new SurrogateInterface().dispatch(new Request({type: 'Command', command: new Command()}));
      });
      spec.example('optional second parameter is the response callback', Error('response callback is not a function'), function () {
        new SurrogateInterface().dispatch(new Request({type: 'Command', command: new Command()}), true);
      });
    });
    spec.heading('notify()', function () {
      spec.paragraph('The notify method sends a `Message` to the Interface.  This can be the result of a request sent from the start() callback.');
      spec.example('must pass a Message object', Error('Message required'), function () {
        new SurrogateInterface().notify();
      });
    });
    spec.heading('render()', function () {
      spec.example('first argument must be a Presentation instance', Error('Presentation object required'), function () {
        new SurrogateInterface().render();
      });
      spec.example('second argument must be a valid presentationMode', Error('presentationMode required'), function () {
        new SurrogateInterface().render(new Presentation());
      });
      spec.example('presentationMode must be valid', Error('Invalid presentationMode: Taco'), function () {
        new SurrogateInterface().render(new Presentation(), 'Taco');
      });
      spec.example('optional callback must be function', Error('optional second argument must a commandRequest callback function'), function () {
        new SurrogateInterface().render(new Presentation(), 'View', true);
      });
    });
    spec.heading('canMock()', function () {
      spec.example('returns boolean to indicate if interface has mocking ability', 'boolean', function () {
        var canMock = new SurrogateInterface().canMock();
        return typeof canMock;
      });
    });
    spec.heading('mockRequest()', function () {
      spec.example('parameter must be request or array of requests', undefined, function () {
        var ui = new SurrogateInterface();
        this.shouldThrowError('Error: missing request parameter', function () {
          ui.mockRequest();
        });
        // Empty Stub Commands are ignored in mocks
        ui.mockRequest(new Request(new Command())); // Send single command
        ui.mockRequest([new Request(new Command()), new Request(new Command())]); // Send array of commands
        // Test when one of array elements is bad
        this.shouldThrowError('Error: invalid request parameter', function () {
          ui.mockRequest([new Request(new Command()), 'wtf']);
        });
      });
    });
    spec.heading('info(text)', function () {
      spec.paragraph('Display info to user in background of primary presentation.');
      spec.example('must set interface before invoking', Error('interface not set'), function () {
        new Application().info();
      });
      spec.example('must supply the text info', Error('text parameter required'), function () {
        new Application({interface: new SurrogateInterface()}).info();
      });
    });
    spec.heading('ok(prompt, callback)', function () {
      spec.paragraph('Pause before proceeding');
      spec.example('must set interface before invoking', Error('interface not set'), function () {
        new Application().ok();
      });
      spec.example('must provide the text prompt param', Error('prompt required'), function () {
        new Application({interface: new SurrogateInterface()}).ok();
      });
      spec.example('must provide callback param', Error('callback required'), function () {
        new Application({interface: new SurrogateInterface()}).ok('You are about to enter the twilight zone.');
      });
    });
    spec.heading('yesno(prompt, callback)', function () {
      spec.paragraph('Query user with a yes no question.');
      spec.example('must set interface before invoking', Error('interface not set'), function () {
        new Application().yesno();
      });
      spec.example('must provide the text question param', Error('prompt required'), function () {
        new Application({interface: new SurrogateInterface()}).yesno();
      });
      spec.example('must provide callback param', Error('callback required'), function () {
        new Application({interface: new SurrogateInterface()}).yesno('Are we there yet?');
      });
    });
    spec.heading('ask(prompt, attribute, callback)', function () {
      spec.paragraph('Simple single item prompt.');
      spec.example('must provide the text question param', Error('prompt required'), function () {
        new SurrogateInterface().ask();
      });
      spec.example('next param is attribute or callback', Error('attribute or callback expected'), function () {
        new SurrogateInterface().ask('What it do');
      });
      spec.example('must provide callback param', Error('callback required'), function () {
        new SurrogateInterface().ask('Please enter your name', new Attribute({name: 'Name'}));
      });
    });
    spec.heading('choose(prompt, choices, callback)', function () {
      spec.paragraph('prompt to choose an item');
      spec.example('must provide text prompt first', Error('prompt required'), function () {
        new SurrogateInterface().choose();
      });
      spec.example('must supply array of choices', undefined, function () {
        this.shouldThrowError(Error('choices array required'), function () {
          new SurrogateInterface().choose('What it do');
        });
        this.shouldThrowError(Error('choices array required'), function () {
          new SurrogateInterface().choose('this will not', 'work');
        });
        this.shouldThrowError(Error('choices array empty'), function () {
          new SurrogateInterface().choose('empty array?', []);
        });
      });
      spec.example('must provide callback param', Error('callback required'), function () {
        new SurrogateInterface().choose('choose wisely', ['rock', 'paper', 'scissors']);
      });
    });
  });
  spec.heading('Interface Integration', function () {
    if (new SurrogateInterface().canMock())
      spec.example('Test command execution mocking', spec.asyncResults(true), function (callback) {
        // Send 4 mocks and make sure we get 4 callback calls
        var self = this;
        self.callbackCount = 0;
        var testInterface = new SurrogateInterface();
        testInterface.start(new Application(), new Presentation(), function (request) {
          if (request.type == 'mock count')
            self.callbackCount++;
          if (self.callbackCount > 3)
            callback(true);
        });
        var cmds = [];
        var i;
        for (i = 0; i < 4; i++) {
          cmds.push(new Request('mock count'));
        }
        testInterface.mockRequest(cmds);
      });
    // todo update to create app and start interface -or- make libs like bootstrap work without exploding
    spec.xexample('user queries', spec.asyncResults('The End'), function (callback) {
      var io = new SurrogateInterface();
      var app = new Application({interface: io});
      /**
       * Each test is a function ...
       */
      var ok1 = function () {
        io.mockRequest(new Request('ok'));
        app.ok('You can mock ok() before', function () {
          ok2();
        });
      };
      var ok2 = function () {
        app.ok('You can mock ok() after', function () {
          yesno1();
        });
        io.mockRequest(new Request('ok'));
      };
      var yesno1 = function () {
        app.yesno('Yesno can be true', function (answer) {
          if (answer)
            yesno2();
          else
            callback('fail');
        });
        io.mockRequest(new Request('yes'));
      };
      var yesno2 = function () {
        app.yesno('Yesno can be false', function (answer) {
          if (!answer)
            yesno3();
          else
            callback('fail');
        });
        io.mockRequest(new Request('no'));
      };
      var yesno3 = function () {
        app.yesno('Yesno can be undefined', function (answer) {
          if (!answer)
            ask1();
          else
            callback('fail');
        });
        io.mockRequest(new Request('cancel'));
      };
      var ask1 = function () {
        var name = new Attribute({name: 'Name'});
        app.ask('What is your name?', name, function (answer) {
          app.info('Hello ' + answer);
          if (answer == 'John Doe')
            ask2();
          else
            callback(answer);
        });
        io.mockRequest(new Request({type: 'ask', value: 'John Doe'}));
      };
      var ask2 = function () {
        var name = new Attribute({name: 'Name'});
        io.mockRequest(new Request({type: 'ask'})); // no value like canceled dialog
        app.ask('Vas is das name?', name, function (answer) {
          if (undefined === answer)
            choose1();
          else
            callback(answer);
        });
      };
      var choose1 = function () {
        app.choose('Pick one...', ['chicken', 'beef', 'tofu'], function (choice) {
          if (choice == 1)
            choose2();
          else
            callback(choice);
        });
        io.mockRequest(new Request({type: 'choose', value: 'beef'}));
      };
      var choose2 = function () {
        io.mockRequest(new Request({type: 'choose'})); // no value like canceled dialog
        app.choose('Pick one...', ['chicken', 'beef', 'tofu'], function (choice) {
          if (undefined === choice)
            callback('The End');
          else
            callback(choice);
        });
      };
      /**
       * Launch test
       */
      ok1();
    });
  });
  if (new SurrogateInterface().description == 'a REPLInterface') {
    var wasMuted = spec.mute(false).testsCreated;
    spec.example('interface tests applied', true, function () {
      this.log('Tests Muted: ' + wasMuted);
      return wasMuted > 0;
    });
  }
};

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core-list.test.js
 */
spec.test('tgi-core/lib/tgi-core-list.spec.js', 'List', 'of items', function (callback) {
  var SurrogateListClass = List;
  spec.paragraph('Lists are an ordered collection of items.  Each item is an array of values that correspond to the attributes for model used in constructor.');
  spec.heading('CONSTRUCTOR', function () {
    spec.paragraph('Creation of all Collections must adhere to following examples:');
    spec.example('objects created should be an instance of List', true, function () {
      return new SurrogateListClass(new Model()) instanceof List;
    });
    spec.example('should make sure new operator used', Error('new operator required'), function () {
      List(); // jshint ignore:line
    });
    spec.example('must be instantiated with model parameter.  The model attributes represent the list columns.', Error('argument required: model'), function () {
      new List();
    });
  });
  spec.heading('PROPERTIES', function () {
  });
  spec.heading('METHODS', function () {
    spec.heading('length()', function () {
      spec.example('length method returns the number of items in the list.', 0, function () {
        return new List(new Model()).length();
      });
    });
    spec.heading('clear()', function () {
      spec.example('clear the list.', 0, function () {
        return new List(new Model()).addItem(new Model()).clear().length();
      });
    });
    spec.heading('get(attributeName)', function () {
      spec.paragraph('Gets value of attribute for given item.');
      spec.example('throws error if no current item', Error('list is empty'), function () {
        new List(new Model()).get('id'); // see integration tests
      });
    });
    spec.heading('set(attributeName,value)', function () {
      spec.paragraph('Sets value of attribute for given item.');
      spec.example('throws error if no current item', Error('list is empty'), function () {
        new List(new Model()).set('id'); // see integration tests
      });
      spec.example('throws an error if the attribute does not exists', Error('attribute not valid for list model'), function () {
        var list = new List(new Model());
        list.addItem(new Model());
        list.set('whatever');
      });
    });
    spec.heading('addItem()', function () {
      spec.example('add item to list verify length is correct.', 1, function () {
        var list = new List(new Model());
        return list.addItem(new Model()).length(); // returns ref for method chaining
      });
    });
    spec.heading('removeItem()', function () {
      spec.example('add then item to list verify length is correct.', 0, function () {
        var list = new List(new Model());
        return list.addItem(new Model()).removeItem().length(); // returns ref for method chaining
      });
    });
    spec.heading('moveNext()', function () {
      spec.example('move to next item in list', false, function () {
        return new List(new Model()).moveNext(); // Returns true when move succeeds
      });
    });
    spec.heading('movePrevious()', function () {
      spec.example('move to the previous item in list', false, function () {
        return new List(new Model()).movePrevious(); // Returns true when move succeeds
      });
    });
    spec.heading('moveFirst()', function () {
      spec.example('move to the first item in list', false, function () {
        return new List(new Model()).moveFirst(); // Returns true when move succeeds
      });
    });
    spec.heading('moveLast()', function () {
      spec.example('move to the last item in list', false, function () {
        return new List(new Model()).moveLast(); // Returns true when move succeeds
      });
    });
    spec.heading('sort(key)', function () {
      spec.example('sort 1,2 in reverse order and return first element', Error('sort order required'), function () {
        new List(new Model()).sort(); // see integration tests
      });
    });
  });
  spec.heading('List Integration', function () {
    spec.heading('List methods are tested here', function () {
      spec.example('list movement and sorting', undefined, function () {
        var test = this;
        // Create actor class
        var Actor = function (args) {
          Model.call(this, args);
          this.modelType = "Actor";

          this.attributes.push(new Attribute('name'));
          this.attributes.push(new Attribute('born', 'Number'));
          this.attributes.push(new Attribute('isMale', 'Boolean'));
        };
        Actor.prototype = inheritPrototype(Model.prototype);

        // Create list of actors
        var actor = new Actor();
        var actors = new List(actor);
        var actorsInfo = [
          // Actor              Born  Male
          ['Jack Nicholson', 1937, true],
          ['Meryl Streep', 1949, false],
          ['Marlon Brando', 1924, true],
          ['Cate Blanchett', 1969, false],
          ['Robert De Niro', 1943, true],
          ['Judi Dench', 1934, false],
          ['Al Pacino', 1940, true],
          ['Nicole Kidman', 1967, false],
          ['Daniel Day-Lewis', 1957, true],
          ['Shirley MacLaine', 1934, false],
          ['Dustin Hoffman', 1937, true],
          ['Jodie Foster', 1962, false],
          ['Tom Hanks', 1956, true],
          ['Kate Winslet', 1975, false],
          ['Anthony Hopkins', 1937, true],
          ['Angelina Jolie', 1975, false],
          ['Paul Newman', 1925, true],
          ['Sandra Bullock', 1964, false],
          ['Denzel Washington', 1954, true],
          ['Renée Zellweger', 1969, false]
        ];

        // Build List
        for (var i in actorsInfo) {
          if (actorsInfo.hasOwnProperty(i)) {
            if (actorsInfo[i][2]) { // for some populate model then add to list
              actor.set('name', actorsInfo[i][0]);
              actor.set('born', actorsInfo[i][1]);
              actor.set('isMale', actorsInfo[i][2]);
              actors.addItem(actor);
            } else {
              actors.addItem(); // add blank then set attribs
              actors.set('name', actorsInfo[i][0]);
              actors.set('born', actorsInfo[i][1]);
              actors.set('isMale', actorsInfo[i][2]);
            }
          }
        }

        // Test movement thru list
        actors.moveFirst();
        test.shouldBeTrue(actors.get('name') == 'Jack Nicholson');
        actors.moveNext();
        test.shouldBeTrue(actors.get('name') == 'Meryl Streep');
        actors.moveLast();
        test.shouldBeTrue(actors.get('name') == 'Renée Zellweger');

        // Sort the list
        actors.sort({born: -1});  // Youngest actor
        actors.moveFirst();
        test.shouldBeTrue(actors.get('name') == 'Kate Winslet' || actor.get('name') == 'Angelina Jolie');
        actors.sort({born: 1});  // Oldest actor
        actors.moveFirst();
        test.shouldBeTrue(actors.get('name') == 'Marlon Brando');
      });
      spec.runnerListStoreIntegration(MemoryStore);
    });
  });
});
spec.runnerListStoreIntegration = function (SurrogateStore) {
  spec.example('Test variations on getList method.', spec.asyncResults(true), function (callback) {
    var test = this;
    var storeBeingTested = new SurrogateStore();
    test.log('storeBeingTested: ' + storeBeingTested);

    // Create list of actors
    test.actorsInfo = [
      // Actor Born Male Oscards
      ['Jack Nicholson', new Date("01/01/1937"), true, 3],
      ['Meryl Streep', new Date("01/01/1949"), false, 3],
      ['Marlon Brando', new Date("01/01/1924"), true, 2],
      ['Cate Blanchett', new Date("01/01/1969"), false, 1],
      ['Robert De Niro', new Date("01/01/1943"), true, 2],
      ['Judi Dench', new Date("01/01/1934"), false, 1],
      ['Al Pacino', new Date("01/01/1940"), true, 1],
      ['Nicole Kidman', new Date("01/01/1967"), false, null],
      ['Daniel Day-Lewis', new Date("01/01/1957"), true, null],
      ['Shirley MacLaine', new Date("01/01/1934"), false, null],
      ['Dustin Hoffman', new Date("01/01/1937"), true, null],
      ['Jodie Foster', new Date("01/01/1962"), false, null],
      ['Tom Hanks', new Date("01/01/1956"), true, null],
      ['Kate Winslet', new Date("01/01/1975"), false, null],
      ['Anthony Hopkins', new Date("01/01/1937"), true, null],
      ['Angelina Jolie', new Date("01/01/1975"), false, null],
      ['Paul Newman', new Date("01/01/1925"), true, null],
      ['Sandra Bullock', new Date("01/01/1964"), false, null],
      ['Denzel Washington', new Date("01/01/1954"), true, null],
      ['Renée Zellweger', new Date("01/01/1969"), false, null]
    ];

    // Create actor class
    test.Actor = function (args) {
      Model.call(this, args);
      this.modelType = "Actor";
      this.attributes.push(new Attribute('name'));
      this.attributes.push(new Attribute('born', 'Date'));
      this.attributes.push(new Attribute('isMale', 'Boolean'));
      this.attributes.push(new Attribute('oscarWs', 'Number'));
    };
    test.Actor.prototype = inheritPrototype(Model.prototype);
    test.actor = new test.Actor(); // instance to use for stuff

    // Make sure store starts in known state.  Stores such as mongoStore will retain test values.
    // So... use getList to get all Actors then delete them from the Store
    test.list = new List(new test.Actor());
    test.oldActorsKilled = 0;
    test.oldActorsFound = 0;
    try {
      test.killhim = new test.Actor();
      storeBeingTested.getList(test.list, [], function (list, error) {
        if (typeof error != 'undefined') {
          callback(error);
          return;
        }
        if (list._items.length < 1)
          storeActors();
        else {
          test.oldActorsFound = list._items.length;
          var testakill = function (model, error) {
            if (++test.oldActorsKilled >= test.oldActorsFound) {
              storeActors();
            }
          };
          for (var i = 0; i < list._items.length; i++) {
            test.killhim.set('id', list._items[i][0]);
            storeBeingTested.deleteModel(test.killhim, testakill);
          }
        }
      });
    }
    catch (err) {
      callback(err);
    }

    // callback after model cleaned
    // now, build List and add to store
    function storeActors() {
      test.actorsStored = 0;
      for (var i = 0; i < test.actorsInfo.length; i++) {
        test.actor.set('ID', null);
        test.actor.set('name', test.actorsInfo[i][0]);
        test.actor.set('born', test.actorsInfo[i][1]);
        test.actor.set('isMale', test.actorsInfo[i][2]);
        storeBeingTested.putModel(test.actor, actorStored);
      }
    }

    // callback after actor stored
    function actorStored(model, error) {
      if (typeof error != 'undefined') {
        callback(error);
        return;
      }
      if (++test.actorsStored >= test.actorsInfo.length) {
        getAllActors();
      }
    }

    // test getting all 20
    function getAllActors() {
      try {
        storeBeingTested.getList(test.list, {}, function (list, error) {
          if (typeof error != 'undefined') {
            callback(error);
            return;
          }
          test.shouldBeTrue(list._items.length == 20, '20');
          getTomHanks();
        });
      }
      catch (err) {
        callback(err);
      }
    }

    // only one Tom Hanks
    function getTomHanks() {
      try {
        storeBeingTested.getList(test.list, {name: "Tom Hanks"}, function (list, error) {
          if (typeof error != 'undefined') {
            callback(error);
            return;
          }
          test.shouldBeTrue(list._items.length == 1, ('1 not ' + list._items.length));
          getD();
        });
      }
      catch (err) {
        callback(err);
      }
    }

    // 3 names begin with D
    // test RegExp
    function getD() {
      try {
        storeBeingTested.getList(test.list, {name: /^D/}, function (list, error) {
          if (typeof error != 'undefined') {
            callback(error);
            return;
          }
          test.shouldBeTrue(list._items.length == 3, ('3 not ' + list._items.length));
          getRZ();
        });
      }
      catch (err) {
        callback(err);
      }
    }

    // Renée Zellweger only female starting name with 'R'
    // test filter 2 properties (logical AND)
    function getRZ() {
      try {
        storeBeingTested.getList(test.list, {name: /^R/, isMale: false}, function (list, error) {
          if (typeof error != 'undefined') {
            callback(error);
            return;
          }
          test.shouldBeTrue(list._items.length == 1, ('1 not ' + list._items.length));
          if (list._items.length)
            test.shouldBeTrue(list.get('name') == 'Renée Zellweger', 'rz');
          getAlphabetical();
        });
      }
      catch (err) {
        callback(err);
      }
    }

    // Retrieve list alphabetically by name
    // test order parameter
    function getAlphabetical() {
      try {
        storeBeingTested.getList(test.list, {}, {name: 1}, function (list, error) {
          if (typeof error != 'undefined') {
            callback(error);
            return;
          }
          // Verify each move returns true when move succeeds
          test.shouldBeTrue(list.moveFirst(), 'moveFirst');
          test.shouldBeTrue(!list.movePrevious(), 'movePrevious');
          test.shouldBeTrue(list.get('name') == 'Al Pacino', 'AP');
          test.shouldBeTrue(list.moveLast(), 'moveLast');
          test.shouldBeTrue(!list.moveNext(), 'moveNext');
          test.shouldBeTrue(list.get('name') == 'Tom Hanks', 'TH');
          callback(true);
        });
      }
      catch (err) {
        callback(err);
      }
    }
  });
};
/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core-message.spec.js
 */
spec.test('tgi-core/lib/tgi-core-message.spec.js', 'Message', 'between host and client', function (callback) {
  spec.heading('Message Class', function () {
    spec.paragraph('Messages are used by Transport to send to host or UI.');
    spec.heading('CONSTRUCTOR', function () {
      spec.example('objects created should be an instance of Message', true, function () {
        return new Message('Null') instanceof Message;
      });
      spec.example('should make sure new operator used', Error('new operator required'), function () {
        Message('Null'); // jshint ignore:line
      });
      spec.example('first parameter is required', Error('message type required'), function () {
        new Message();
      });
      spec.example('first parameter must be valid message type', Error('Invalid message type: http://www.youtube.com/watch?v=2o7V1f7lbk4'), function () {
        new Message('http://www.youtube.com/watch?v=2o7V1f7lbk4');
      });
    });
    spec.heading('METHODS', function () {
      spec.heading('toString()', function () {
        spec.example('should return a description of the message', 'Null Message', function () {
          return new Message('Null').toString();
        });
      });
      spec.heading('Attribute.getTypes', function () {
        spec.paragraph('This helper function returns an array of valid Message types.  This is just a function - not a prototype method.');
        spec.example('show the types', undefined, function () {
          this.log(Message.getTypes());
        });
      });
    });
  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core-model.spec.js
 */
spec.test('tgi-core/lib/tgi-core-model.spec.js', 'Model', 'abstracts entities using a collection of attributes', function (callback) {
  spec.testModel(Model);
});

/**
 * test Model and Models
 */
spec.testModel = function (SurrogateModel) {
  if (SurrogateModel.modelType!='Model') {
    spec.mute(true);
  }
  spec.heading('CONSTRUCTOR', function () {
    spec.paragraph('Creation of all Models must adhere to following examples:');
    spec.example('objects created should be an instance of Model', true, function () {
      return new SurrogateModel() instanceof Model;
    });
    spec.example('should make sure new operator used', Error('new operator required'), function () {
      SurrogateModel(); // jshint ignore:line
    });
    spec.example('should make sure properties are valid', Error('error creating Model: invalid property: sup'), function () {
      new SurrogateModel({sup: 'yo'});
    });
    spec.example('can supply attributes in constructor in addition to ID default', 'scrabble', function () {
      var play = new SurrogateModel({attributes: [new Attribute('game')]});
      play.set('game', 'scrabble'); // this would throw error if attribute did not exist
      return play.get('game');
    });
  });
  spec.heading('PROPERTIES', function () {
    spec.heading('tags', function () {
      spec.paragraph('Tags are an array of strings that can be used in searching.');
      spec.example('should be an array or undefined', undefined, function () {
        var m = new SurrogateModel(); // default is undefined
        this.shouldBeTrue(m.tag === undefined && m.getObjectStateErrors().length === 0);
        m.tags = [];
        this.shouldBeTrue(m.getObjectStateErrors().length === 0);
        m.tags = 'your it';
        this.shouldBeTrue(m.getObjectStateErrors().length == 1);
      });
    });
    spec.heading('attributes', function () {
      spec.paragraph('The attributes property is an array of Attributes.');
      spec.example('should be an array', true, function () {
        var goodModel = new SurrogateModel(), badModel = new SurrogateModel();
        badModel.attributes = 'wtf';
        return (goodModel.getObjectStateErrors().length === 0 && badModel.getObjectStateErrors().length == 1);
      });
      spec.example('elements of array must be instance of Attribute', undefined, function () {
        // passing true to getObjectStateErrors() means only check model and not subclass validations
        // todo make unit test for above
        var model = new SurrogateModel();
        model.attributes = [new Attribute("ID", "ID")];
        this.shouldBeTrue(model.getObjectStateErrors(true).length === 0);
        model.attributes = [new Attribute("ID", "ID"), new SurrogateModel(), 0, 'a', {}, [], null];
        this.shouldBeTrue(model.getObjectStateErrors(true).length == 6);
      });
    });
    spec.heading('value', function () {
    });
  });
  spec.heading('METHODS', function () {
    spec.heading('toString()', function () {
      spec.example('should return a description of the model', true, function () {
        return new SurrogateModel().toString().length > 0;
      });
    });
    spec.heading('copy(sourceModel)', function () {
      spec.example('copy all attribute values of a model', undefined, function () {
        var Foo = function (args) {
          Model.call(this, args);
          this.modelType = "Foo";
          this.attributes.push(new Attribute('name'));
        };
        Foo.prototype = inheritPrototype(Model.prototype);
        var m1 = new Foo();
        var m2 = new Foo();
        var m3 = m1;
        m1.set('name', 'Bar');
        m2.set('name', 'Bar');
        // First demonstrate instance ref versus another model with equal attributes
        this.shouldBeTrue(m1 === m3); // assigning one model to variable references same instance
        this.shouldBeTrue(m3.get('name') === 'Bar'); // m3 changed when m1 changed
        this.shouldBeTrue(m1 !== m2); // 2 models are not the same instance
        this.shouldBeTrue(JSON.stringify(m1) === JSON.stringify(m2)); // but they are identical
        // clone m1 into m4 and demonstrate that contents equal but not same ref to object
        var m4 = new Foo();
        m4.copy(m1);
        this.shouldBeTrue(m1 !== m4); // 2 models are not the same instance
        this.shouldBeTrue(JSON.stringify(m1) === JSON.stringify(m4)); // but they are identical
      });
    });
    spec.heading('getObjectStateErrors()', function () {
      spec.example('should return array of validation errors', undefined, function () {
        this.shouldBeTrue(new SurrogateModel().getObjectStateErrors() instanceof Array);
      });
      spec.example('first attribute must be an ID field', 'first attribute must be ID', function () {
        var m = new SurrogateModel();
        m.attributes = [new Attribute('spoon')];
        return m.getObjectStateErrors();
      });
    });
    spec.heading('onEvent', function () {
      spec.paragraph('Use onEvent(events,callback)');
      spec.example('first parameter is a string or array of event subscriptions', Error('subscription string or array required'), function () {
        new SurrogateModel().onEvent();
      });
      spec.example('callback is required', Error('callback is required'), function () {
        new SurrogateModel().onEvent([]);
      });
      spec.example('events are checked against known types', Error('Unknown command event: onDrunk'), function () {
        new SurrogateModel().onEvent(['onDrunk'], function () {
        });
      });
      spec.example('here is a working version', undefined, function () {
        this.log('T.getAttributeEvents()');
        // Validate - callback when attribute needs to be validated
        // StateChange -- callback when state of object (value or validation state) has changed
        new Model().onEvent(['Validate'], function () {
        });
      });
    });
    spec.heading('get(attributeName)', function () {
      spec.example('returns undefined if the attribute does not exist', undefined, function () {
        this.shouldBeTrue(new SurrogateModel().get('whatever') === undefined);
      });
      spec.example("returns the value for given attribute", 42, function () {
        var question = new SurrogateModel({attributes: [new Attribute('answer', 'Number')]});
        question.attributes[1].value = 42;
        return question.get('answer');
      });
    });
    spec.heading('getAttributeType(attributeName)', function () {
      spec.example('returns attribute type for given attribute name', 'Date', function () {
        return new Model({attributes: [new Attribute('born', 'Date')]}).getAttributeType('born');
      });
    });
    spec.heading('set(attributeName,value)', function () {
      spec.example('throws an error if the attribute does not exists', Error('attribute not valid for model'), function () {
        new SurrogateModel().set('whatever');
      });
      spec.example("sets the value for given attribute", 42, function () {
        var question = new SurrogateModel({attributes: [new Attribute('answer', 'Number')]});
        question.set('answer', 42);
        return question.attributes[1].value;
      });
    });
    spec.heading('validate', function () {
      spec.paragraph('check valid object state and value for attribute - invoke callback for results');
      spec.example('callback is required', Error('callback is required'), function () {
        new Model().validate();
      });
    });

    spec.heading('setError', function () {
      spec.paragraph('Set a error condition and descriptive message');
      spec.example('first argument condition required', Error('condition required'), function () {
        new Model().setError();
      });
      spec.example('second argument description required', Error('description required'), function () {
        new Model().setError('login');
      });
    });
    spec.heading('clearError', function () {
      spec.paragraph('Clear a error condition');
      spec.example('first argument condition required', Error('condition required'), function () {
        new Model().clearError();
      });
    });

  });
  spec.heading('INTEGRATION', function () {
    spec.example('model validation usage demonstrated', spec.asyncResults('test4: 0'), function (callback) {

      // Create a model with each attribute having and error
      var model = new Model({
        attributes: [
          new Attribute({name: 'Name', validationRule: {required: true}}),
          new Attribute({name: 'Age', type: 'Number', validationRule: {range: [18, null]}}),
          new Attribute({name: 'Sex', validationRule: {required: true}})
        ]
      });

      model.setError('danger', 'Danger Will Robinson');

      // Create a model validation where males have to be 21
      model.onEvent('Validate', function () {
        var name = model.get('name');
        var age = model.get('age');
        var sex = model.get('sex');
        if (sex != 'F' && age < 21)
          model.validationErrors.push('Males must be 21 or over');
      });
      model.validate(test1);

      // Expect 1 error from B9 Robot (Attribute errors ignored if model state error)
      function test1() {
        if (model.validationErrors.length == 1) {
          model.clearError('danger');
          model.validate(test2);
        } else {
          callback('test1: ' + model.validationErrors.length);
        }
      }

      // Expect 3 errors for each attribute
      function test2() {
        if (model.validationErrors.length == 3) {
          model.set('name', 'John Doe');
          model.set('age', 18);
          model.set('sex', 'M');
          model.validate(test3);
        } else {
          callback('test2: ' + model.validationErrors.length);
        }
      }

      // Expect 1 errors since all attributes fixed but model will fail
      function test3() {
        if (model.validationErrors.length == 1 && model.validationMessage == 'Males must be 21 or over') {
          model.set('age', 21);
          model.validate(test4);
        } else {
          callback('test3: ' + model.validationErrors.length);
        }
      }

      // Test done should be no errors (to pass final test)
      function test4() {
        callback('test4: ' + model.validationErrors.length);
      }
    });
  });
  if (SurrogateModel.modelType!='Model') {
    var wasMuted = spec.mute(false).testsCreated;
    spec.paragraph('*' + wasMuted + ' model tests applied*');
  }
};

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core-procedure.spec.js
 */
spec.test('tgi-core/lib/tgi-core-procedure.spec.js', 'Procedure', 'manages set of Commands synchronous or asynchronous', function (callback) {
  spec.heading('Procedure Class', function () {
    spec.paragraph('The `Procedure` class manages a set of `Command` objects.  It provides a pattern for handling ' +
    'asynchronous and synchronous command execution.');
    spec.paragraph('`Command` objects create and manage the `Procedure` object.');
    spec.heading('CONSTRUCTOR', function () {
      spec.example('objects created should be an instance of Procedure', true, function () {
        return new Procedure() instanceof Procedure;
      });
      spec.example('should make sure new operator used', Error('new operator required'), function () {
        Procedure(); // jshint ignore:line
      });
      spec.example('should make sure argument properties are valid', Error('error creating Procedure: invalid property: yo'), function () {
        new Procedure({yo: 'whatup'});
      });
    });
    spec.heading('PROPERTIES', function () {
      spec.heading('tasks', function () {
        spec.paragraph('Tasks is an array of objects that represent each step of the procedure.  See TASKS section ' +
        'below for each property of this unnamed object (task array element).');
        spec.example('tasks can be falsy if no tasks defined otherwise it has to be an array',
          Error('error creating Procedure: tasks is not an array'), function () {
            new Procedure({tasks: true});
          });
        spec.example('the parameters must be valid for the object in each element of the array',
          Error('error creating Procedure: invalid task[0] property: clean'), function () {
            new Procedure({
              tasks: [
                {clean: 'room'}
              ]
            });
          });
      });
      spec.heading('tasksNeeded', function () {
        spec.paragraph('Total tasks that will execute (does not include skipped tasks).');
        spec.paragraph('_See Integration Tests for usage_');
      });
      spec.heading('tasksCompleted', function () {
        spec.paragraph('Number of tasks completed and started (does not include skipped tasks)');
        spec.paragraph('_See Integration Tests for usage_');
      });
    });
    spec.heading('TASKS', function () {
      spec.paragraph('Each element of the array tasks is an object with the following properties:');
      spec.heading('label', function () {
        spec.paragraph('optional label for this task element');
        spec.example('if used it must be a string', Error('error creating Procedure: task[0].label must be string'), function () {
          new Procedure({
            tasks: [
              {label: true}
            ]
          });
        });
      });
      spec.heading('command', function () {
        spec.paragraph('Command to execute for this task');
        spec.example('if used it must be a `Command`', Error('error creating Procedure: task[0].command must be a Command object'), function () {
          new Procedure({
            tasks: [
              {command: true}
            ]
          });
        });
      });
      spec.heading('requires', function () {
        spec.paragraph('Establish other tasks that must be complete before this task is executed.  ' +
        'Pass as array of or single element. Can be string(for label label) or number(for array index).  ' +
        'Use -1 for previous task, null for no dependencies');
        spec.example('test it', undefined, function () {
          this.shouldThrowError(Error('invalid type for requires in task[0]'), function () {
            new Procedure({
              tasks: [
                {requires: new Date()}
              ]
            });
          });
          // if number supplied it is index in array
          this.shouldThrowError(Error('missing task #1 for requires in task[0]'), function () {
            new Procedure({
              tasks: [
                {command: new Procedure({}), requires: 1}
              ]
            });
          });
          this.shouldThrowError(Error('task #-2 invalid requires in task[0]'), function () {
            new Procedure({
              tasks: [
                {command: new Procedure({}), requires: -2}
              ]
            });
          });
          // requires defaults to -1 which means the previous element in the array so essentially the default
          // is sequential processing.  Set to null for no dependencies which makes it asynchronous -1 means
          // previous element is ignored for first index and is the default
          var proc = new Procedure({
            tasks: [
              {command: new Command({})}
            ]
          });
          this.shouldBeTrue(proc.tasks[0].requires == -1);
        });
      });
    });
    spec.heading('METHODS', function () {
      spec.heading('getObjectStateErrors', function () {
        spec.example('should return array of validation errors', 'falsy', function () {
          if (!new Procedure().getObjectStateErrors()) return 'falsy';
        });
      });
    });
    spec.heading('INTEGRATION', function () {
      spec.example('synchronous sequential tasks are the default when tasks has no requires property', spec.asyncResults('abc123'), function (callback) {
        var cmd = new Command({
          name: 'cmdProcedure', type: 'Procedure', contents: new Procedure({
            tasks: [
              {
                command: new Command({
                  type: 'Function',
                  contents: function () {
                    var self = this;
                    setTimeout(function () {
                      self._parentProcedure.bucket += '1';
                      self.complete();
                    }, 250); // delayed to test that order is maintained
                  }
                })
              },
              {
                command: new Command({
                  type: 'Function',
                  contents: function () {
                    this._parentProcedure.bucket += '2';
                    this.complete();
                  }
                })
              },
              function () { // shorthand version of command function ...
                this._parentProcedure.bucket += '3';
                this.complete();
              }
            ]
          })
        });
        cmd.onEvent('*', function (event) {
          if (event == 'Completed') callback(cmd.bucket);
        });
        cmd.bucket = 'abc';
        cmd.execute();
      });
      spec.example('async tasks are designated when requires is set to null', spec.asyncResults('eenie meenie miney mo miney mo'), function (callback) {
        var execCount = 0; // Call twice to test reset state

        var cmd = new Command({
          name: 'cmdProcedure', type: 'Procedure', contents: new Procedure({
            tasks: [
              {
                command: new Command({
                  type: 'Function',
                  contents: function () {
                    var self = this;
                    setTimeout(function () {
                      self._parentProcedure.bucket += ' mo';
                      self.complete();
                    }, 50); // This will be done last
                  }
                })
              },
              {
                requires: null, // no wait to run this
                command: new Command({
                  type: 'Function',
                  contents: function () {
                    this._parentProcedure.bucket += ' miney';
                    this.complete();
                  }
                })
              }
            ]
          })
        });
        cmd.onEvent('*', function (event) {
          if (event == 'Completed') {
            if (execCount++ < 2) {
              cmd.execute();
            } else {
              callback(cmd.bucket);
            }
          }

        });
        cmd.bucket = 'eenie meenie';
        execCount++;
        cmd.execute();
      });
      spec.example('this example shows multiple dependencies', spec.asyncResults('todo: drugs sex rock & roll'), function (callback) {
        var cmd = new Command({
          name: 'cmdProcedure', type: 'Procedure', contents: new Procedure({
            tasks: [
              {
                command: new Command({
                  type: 'Function',
                  contents: function () {
                    var self = this;
                    setTimeout(function () {
                      self._parentProcedure.bucket += ' rock';
                      self.complete();
                    }, 300);
                  }
                })
              },
              {
                requires: null, // no wait to run this
                label: 'sex',
                command: new Command({
                  type: 'Function',
                  contents: function () {
                    var self = this;
                    setTimeout(function () {
                      self._parentProcedure.bucket += ' sex';
                      self.complete();
                    }, 200);
                  }
                })
              },
              {
                requires: null, // no wait to run this
                label: 'drugs',
                command: new Command({
                  type: 'Function',
                  contents: function () {
                    var self = this;
                    setTimeout(function () {
                      self._parentProcedure.bucket += ' drugs';
                      self.complete();
                    }, 100);
                  }
                })
              },
              {
                requires: ['sex', 'drugs', 0], // need these labels and array index 0
                command: new Command({
                  type: 'Function',
                  contents: function () {
                    this._parentProcedure.bucket += ' & roll';
                    this.complete();
                  }
                })
              }
            ]
          })
        });
        cmd.onEvent('*', function (event) {
          if (event == 'Completed') callback(cmd.bucket);
        });
        cmd.bucket = 'todo:';
        cmd.execute();
      });
    });
  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core-request.spec.js
 */
spec.test('tgi-core/lib/tgi-core-request.spec.js', 'Request', 'from Interface - Application handles response', function (callback) {
  spec.paragraph('Requests handle the Request / Response design pattern.  They are used by the Interface class to ' +
  'communicate with the Application Model');
  spec.heading('CONSTRUCTOR', function () {
    spec.example('objects created should be an instance of Request', true, function () {
      return new Request('Null') instanceof Request;
    });
    spec.example('should make sure new operator used', Error('new operator required'), function () {
      Request('Null'); // jshint ignore:line
    });
    spec.example('request type must be specified', Error('Request type required'), function () {
      new Request();
    });
    spec.example('simple string parameter creates request of named type', 'example', function () {
      return new Request('example').type;
    });
    spec.example('type can be specified when object passed', 'example', function () {
      return new Request({type: 'example'}).type;
    });
    spec.example('Command type requests expect contents to contain a command object', Error('command object required'), function () {
      return new Request({type: 'Command'});
    });
    spec.example('correct version', 'Command Request: Stub Command: a command', function () {
      return new Request({type: 'Command', command: new Command()});
    });
  });
  spec.heading('METHODS', function () {
    spec.heading('toString()', function () {
      spec.example('should return a description of the Request', 'Null Request', function () {
        return new Request('Null').toString();
      });
    });
  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core-store.spec.js
 */
spec.test('tgi-core/lib/tgi-core-store.spec.js', 'Store', 'holds Model objects for updating and retrieving', function (callback) {
  spec.paragraph('The store class is used for object persistence.');
  spec.heading('CONSTRUCTOR', function () {
    spec.runnerStoreConstructor(Store);
  });
  spec.runnerStoreMethods(Store);
});

spec.runnerStoreConstructor = function (SurrogateStore) {
  spec.example('objects created should be an instance of Store', true, function () {
    return new SurrogateStore() instanceof Store;
  });
  spec.example('should make sure new operator used', Error('new operator required'), function () {
    SurrogateStore(); // jshint ignore:line
  });
  spec.example('should make sure properties are valid', Error('error creating Store: invalid property: food'), function () {
    new SurrogateStore({food: 'twinkies'});
  });
};
spec.runnerStoreMethods = function (SurrogateStore) {
  spec.heading('PROPERTIES', function () {
    spec.heading('name', function () {
      spec.example('name of store can be set in constructor', 'punchedCards', function () {
        return new SurrogateStore({name: 'punchedCards'}).name;
      });
    });
    spec.heading('storeType', function () {
      spec.paragraph('storeType defaults to Store Class Name but can be set to suite the app architecture.');
      spec.example('storeType can be set in constructor', 'legacyStorage', function () {
        return new SurrogateStore({storeType: 'legacyStorage'}).storeType;
      });
    });
  });
  spec.heading('METHODS', function () {
    var services = new SurrogateStore().getServices();
    spec.example('getServices() returns an object with interface for the Store.', undefined, function () {
      this.log(JSON.stringify(services));
      this.shouldBeTrue(services instanceof Object);
      this.shouldBeTrue(typeof services['isReady'] == 'boolean'); // don't use until
      this.shouldBeTrue(typeof services['canGetModel'] == 'boolean'); // define all allowed methods...
      this.shouldBeTrue(typeof services['canPutModel'] == 'boolean');
      this.shouldBeTrue(typeof services['canDeleteModel'] == 'boolean');
      this.shouldBeTrue(typeof services['canGetList'] == 'boolean');
    });
    spec.heading('toString()', function () {
      spec.example('should return a description of the Store', "ConvenienceStore: 7-Eleven", function () {
        var cStore = new SurrogateStore();
        this.log(cStore.toString());
        cStore.name = '7-Eleven';
        cStore.storeType = 'ConvenienceStore';
        this.log(cStore.toString());
        return cStore.toString();
      });
    });
    spec.heading('onConnect()', function () {
      spec.example('must pass url string', Error('argument must a url string'), function () {
        new SurrogateStore().onConnect();
      });
      spec.example('must pass callback function', Error('argument must a callback'), function () {
        new SurrogateStore().onConnect("");
      });
      if (services['isReady']) {
        spec.example('return store and undefined error upon successful connection to remote store.', spec.asyncResults(true), function (callback) {
          new SurrogateStore().onConnect('', function (store, err) {
            if (err) {
              callback(err);
            } else {
              callback(store instanceof Store);
            }
          });
        });
      } else {
        spec.paragraph('see integration test for ' + new SurrogateStore().storeType);
      }
    });
    spec.heading('getModel()', function () {
      if (services['canGetModel']) {
        spec.example('must pass valid model', Error('argument must be a Model'), function () {
          new SurrogateStore().getModel();
        });
        spec.example('model must have no validation errors', Error('model has validation errors'), function () {
          var m = new Model();
          m.attributes = null;
          new SurrogateStore().getModel(m);
        });
        spec.example('ID attribute must have truthy value', Error('ID not set'), function () {
          new SurrogateStore().getModel(new Model());
        });
        spec.example('callback function required', Error('callback required'), function () {
          var m = new Model();
          m.attributes[0].value = 1;
          new SurrogateStore().getModel(m);
        });
        if (services['isReady']) {
          spec.example('returns error when model not found', spec.asyncResults('Error: model not found in store'), function (callback) {
            var m = new Model();
            m.modelType = "Supermodel"; // change type so one not used in tests
            m.attributes[0].value = 1;
            new SurrogateStore().getModel(m, function (mod, err) {
              if (err) {
                callback(err);
              } else {
                callback(mod);
              }
            });
          });
        } else {
          spec.paragraph('skipping tests since store is not ready');
        }
      } else {
        spec.example('getModel() is not implemented for virtual class', Error(new SurrogateStore().storeType + ' does not provide getModel'), function () {
          new SurrogateStore().getModel();
        });
      }
    });
    spec.heading('putModel(model)', function () {
      if (services['canPutModel']) {
        spec.example('must pass valid model', Error('argument must be a Model'), function () {
          new SurrogateStore().putModel();
        });
        spec.example('model must have no validation errors', Error('model has validation errors'), function () {
          var m = new Model();
          m.attributes = null;
          new SurrogateStore().putModel(m);
        });
        spec.example('callback function required', Error('callback required'), function () {
          var m = new Model();
          m.attributes[0].value = 1;
          new SurrogateStore().putModel(m);
        });
        if (services['isReady']) {
          spec.example('returns error when model not found', spec.asyncResults('Error: model not found in store'), function (callback) {
            var m = new Model();
            m.modelType = "Supermodel";
            m.attributes[0].value = 1;
            new SurrogateStore().putModel(m, function (mod, err) {
              if (err) {
                callback(err);
              } else {
                callback(mod);
              }
            });
          });
          spec.example('creates new model when ID is not set', spec.asyncResults(true), function (callback) {
            // This works but pollutes store with crap
            var m = new Model();
            new SurrogateStore().putModel(m, function (mod, err) {
              if (err) {
                callback(err);
              } else {
                callback(mod.get('id') ? true : false);
              }
            });
          });
        } else {
          spec.paragraph('skipping tests since store is not ready');
        }
      } else {
        spec.example('putModel() is not implemented for virtual class', Error('Store does not provide putModel'), function () {
          new SurrogateStore().putModel();
        });
      }
    });
    spec.heading('deleteModel(model)', function () {
      if (services['canDeleteModel']) {
        spec.example('must pass valid model', Error('argument must be a Model'), function () {
          new SurrogateStore().deleteModel();
        });
        spec.example('model must have no validation errors', Error('model has validation errors'), function () {
          var m = new Model();
          m.attributes = null;
          new SurrogateStore().deleteModel(m);
        });
        spec.example('callback function required', Error('callback required'), function () {
          var m = new Model();
          m.attributes[0].value = 1;
          new SurrogateStore().deleteModel(m);
        });
        if (services['isReady']) {
          spec.example('returns error when model not found', spec.asyncResults('Error: model not found in store'), function (callback) {
            var m = new Model();
            m.modelType = 'PeopleAreString!';
            m.attributes[0].value = 90210;
            new SurrogateStore().deleteModel(m, function (mod, err) {
              if (err) {
                callback(err);
              } else {
                callback(mod);
              }
            });
          });
        } else {
          spec.paragraph('skipping tests since store is not ready');
        }
      } else {
        spec.example('deleteModel() is not implemented for virtual class', Error('Store does not provide deleteModel'), function () {
          new SurrogateStore().deleteModel();
        });
      }
    });
    spec.heading('getList(model, filter, order)', function () {
      spec.paragraph('This method will clear and populate the list with collection from store.  ' +
      'The **filter** property can be used to query the store.  ' +
      'The **order** property can specify the sort order of the list.  ' +
      '_See integration test for more info._');
      if (services['isReady'] && services['canGetList']) {
        spec.example('returns a List populated from store', undefined, function () {
          this.shouldThrowError(Error('argument must be a List'), function () {
            new SurrogateStore().getList();
          });
          this.shouldThrowError(Error('filter argument must be Object'), function () {
            new SurrogateStore().getList(new List(new Model()));
          });
          this.shouldThrowError(Error('callback required'), function () {
            new SurrogateStore().getList(new List(new Model()), []);
          });
          // See integration tests for examples of usage
        });
      } else {
        if (services['isReady']) {
          spec.example('returns a List populated from store', Error('Store does not provide getList'), function () {
            return new SurrogateStore().getList();
          });
        }
      }
    });
  });
  spec.heading('Store Integration', function () {
    spec.heading('CRUD (Create Read Update Delete)', function () {
      spec.example('Exercise all store function for one store.', spec.asyncResults(true), function (callback) {
        var self = this;
        spec.integrationStore = new SurrogateStore();
        var storeBeingTested = spec.integrationStore.name + ' ' + spec.integrationStore.storeType;
        self.log(storeBeingTested);

        // If store is not ready then get out...
        if (!spec.integrationStore.getServices().isReady) {
          self.log('Store is not ready.');
          callback(true);
          return;
        }

        // setup stooge class
        self.Stooge = function (args) {
          Model.call(this, args);
          this.modelType = "_tempTest_Stooge";
          this.attributes.push(new Attribute('name'));
        };
        self.Stooge.prototype = inheritPrototype(Model.prototype);

        // create initial stooges
        self.moe = new self.Stooge();
        self.moe.set('name', 'Moe');
        self.larry = new self.Stooge();
        self.larry.set('name', 'Larry');
        self.shemp = new self.Stooge();
        self.shemp.set('name', 'Shemp');

        // IDs after stored will be here
        self.stoogeIDsStored = [];
        self.stoogesRetrieved = [];
        self.oldStoogesFound = 0;
        self.oldStoogesKilled = 0;

        // Make sure store starts in known state.  Stores such as mongoStore will retain test values.
        // So... use getList to get all stooges then delete them from the Store
        var useListToCleanStart = spec.integrationStore.getServices().canGetList;
        if (useListToCleanStart) {
          var list = new List(new self.Stooge());
          try {
            self.killhim = new self.Stooge();
            spec.integrationStore.getList(list, [], function (list, error) {
              if (typeof error != 'undefined') {
                callback(error);
                return;
              }
              if (list._items.length < 1)
                storeStooges();
              else
                self.oldStoogesFound = list._items.length;
              for (var i = 0; i < list._items.length; i++) {
                self.killhim.set('id', list._items[i][0]);
                /* jshint ignore:start */
                spec.integrationStore.deleteModel(self.killhim, function (model, error) {
                  if (++self.oldStoogesKilled >= self.oldStoogesFound) {
                    storeStooges();
                  }
                })
                /* jshint ignore:end */
              }
            });
          }
          catch (err) {
            callback(err);
          }
        } else {
          storeStooges();
        }

        // callback to store new stooges
        function storeStooges() {
          self.log(self.oldStoogesFound);
          self.log(self.oldStoogesKilled);
          spec.integrationStore.putModel(self.moe, stoogeStored);
          spec.integrationStore.putModel(self.larry, stoogeStored);
          spec.integrationStore.putModel(self.shemp, stoogeStored);
        }

        // callback after storing stooges
        function stoogeStored(model, error) {
          if (typeof error != 'undefined') {
            callback(error);
            return;
          }
          try {
            self.stoogeIDsStored.push(model.get('id'));
            if (self.stoogeIDsStored.length == 3) {
              self.shouldBeTrue(true,'here');
              // Now that first 3 stooges are stored lets retrieve and verify
              var actors = [];
              for (var i = 0; i < 3; i++) {
                actors.push(new self.Stooge());
                actors[i].set('id', self.stoogeIDsStored[i]);
                spec.integrationStore.getModel(actors[i], stoogeRetrieved);
              }
            }
          }
          catch (err) {
            callback(err);
          }
        }

        // callback after retrieving stored stooges
        function stoogeRetrieved(model, error) {
          if (typeof error != 'undefined') {
            callback(error);
            return;
          }
          self.stoogesRetrieved.push(model);
          if (self.stoogesRetrieved.length == 3) {
            self.shouldBeTrue(true,'here');
            // Now we have stored and retrieved (via IDs into new objects).  So verify the stooges made it
            self.shouldBeTrue(self.stoogesRetrieved[0] !== self.moe && // Make sure not a reference but a copy
            self.stoogesRetrieved[0] !== self.larry && self.stoogesRetrieved[0] !== self.shemp,'copy');
            var s = []; // get list of names to see if all stooges made it
            for (var i = 0; i < 3; i++) s.push(self.stoogesRetrieved[i].get('name'));
            self.log(s);
            self.shouldBeTrue(contains(s, 'Moe') && contains(s, 'Larry') && contains(s, 'Shemp'));
            // Replace Shemp with Curly
            var didPutCurly = false;
            for (i = 0; i < 3; i++) {
              if (self.stoogesRetrieved[i].get('name') == 'Shemp') {
                didPutCurly = true;
                self.stoogesRetrieved[i].set('name', 'Curly');
                try {
                  spec.integrationStore.putModel(self.stoogesRetrieved[i], stoogeChanged);
                }
                catch (err) {
                  callback(err);
                }
              }
            }
            if (!didPutCurly) {
              callback(Error("Can't find Shemp!"));
            }
          }
        }

        // callback after storing changed stooge
        function stoogeChanged(model, error) {
          if (typeof error != 'undefined') {
            callback(error);
            return;
          }
          self.shouldBeTrue(model.get('name') == 'Curly','Curly');
          var curly = new self.Stooge();
          curly.set('id', model.get('id'));
          try {
            spec.integrationStore.getModel(curly, storeChangedShempToCurly);
          }
          catch (err) {
            callback(err);
          }
        }

        // callback after retrieving changed stooge
        function storeChangedShempToCurly(model, error) {
          if (typeof error != 'undefined') {
            callback(error);
            return;
          }
          self.shouldBeTrue(model.get('name') == 'Curly','Curly');
          // Now test delete
          self.deletedModelId = model.get('id'); // Remember this
          spec.integrationStore.deleteModel(model, stoogeDeleted);
        }

        // callback when Curly is deleted
        function stoogeDeleted(model, error) {
          if (typeof error != 'undefined') {
            callback(error);
            return;
          }
          // model parameter is what was deleted
          self.shouldBeTrue(undefined === model.get('id')); // ID removed
          self.shouldBeTrue(model.get('name') == 'Curly'); // the rest remains
          // Is it really dead?
          var curly = new self.Stooge();
          curly.set('id', self.deletedModelId);
          spec.integrationStore.getModel(curly, hesDeadJim);
        }

        // callback after lookup of dead stooge
        function hesDeadJim(model, error) {
          if (typeof error != 'undefined') {
            if ((error != 'Error: id not found in store') && (error != 'Error: model not found in store')) {
              callback(error);
              return;
            }
          } else {
            callback(Error('no error deleting stooge when expected'));
            return;
          }
          // Skip List test if subclass can't do
          if (!spec.integrationStore.getServices().canGetList) {
            callback(true);
          } else {
            // Now create a list from the stooge store
            var list = new List(new self.Stooge());
            try {
              spec.integrationStore.getList(list, {}, {name:1}, listReady);
            }
            catch (err) {
              callback(err);
            }
          }
        }

        // callback after list created from store
        function listReady(list, error) {
//          list.sort({name:1});
          if (typeof error != 'undefined') {
            callback(error);
            return;
          }
          self.shouldBeTrue(list instanceof List,'is list');
          self.shouldBeTrue(list.length() == 2,'is 2');
          list.moveFirst();
          self.shouldBeTrue(list.get('name') == 'Larry','larry');
          list.moveNext();
          self.shouldBeTrue(list.get('name') == 'Moe','moe');
          callback(true);
        }
      });
    });
  });

};
/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/tgi-core-transport.spec.js
 */
spec.test('tgi-core/lib/tgi-core-transport.spec.js', 'Transport', 'messages between client and host', function (callback) {
  if (true || typeof io == 'undefined') { // todo cleaner testing without spammy errors - also breaking remote store tests
    spec.paragraph('Handle message passing between host and UI.');
    spec.paragraph('TODO: run these tests in node-make-spec-md with io defined');
    spec.paragraph('Read the source until then...');
    spec.paragraph('https://github.com/tgi-io/tgi-core/blob/master/lib/core/tgi-core-transport.spec.js');
    return;
  }
  spec.heading('Transport Class', function () {
    spec.paragraph('Handle message passing between host and UI.');
    spec.heading('CONSTRUCTOR', function () {
      spec.example('objects created should be an instance of Transport', true, function () {
        return new Transport("*wtf*", function () {
          }) instanceof Transport;
      });
      spec.example('must be instantiated with new', Error('new operator required'), function () {
        Transport("", function () { // jshint ignore:line
        });
      });
      spec.example('must pass url string', Error('argument must a url string'), function () {
        new Transport();
      });
      spec.paragraph('The connection success is signaled via callback. use function(msg){} for' +
      'callback.  msg.Connection indications success, msg.Error for failure (msg.contents' +
      'contains error).');
      spec.example('must pass callback function', Error('argument must a callback'), function () {
        new Transport('');
      });
      spec.example('url must be valid', spec.asyncResponse('Error Message: cannot connect'), function (testNode, returnResponse) {
        new Transport('*url*', function (message) {
          returnResponse(testNode, message);
        }, this);
      });
    });
    spec.heading('METHODS', function () {
      spec.heading('send(message)', function () {
        spec.paragraph('send() is used to send messages to host or UI.  Any errors returned are based on state checks' +
        ' and not resulting from async errors.' +
        ' If confirmation is needed provide callback to notify message has been sent or error has occurred.');
        spec.example('message param required', Error('message required'), function () {
          new Transport("", function () {
          }).send();
        });
        spec.example('message param must be type Message', Error('parameter must be instance of Message'), function () {
          new Transport("", function () {
          }).send('money');
        });
        spec.example('Transport must be connected (async error message)', spec.asyncResponse('Error Message: not connected'), function (testNode, returnResponse) {
          new Transport("*bad*", function () {
            this.send(new Message('Null'), function (msg) {
              returnResponse(testNode, msg);
            });
          });
        });
        spec.example('optional callback must be function', Error('argument must a callback'), function () {
          new Transport("", function () {
          }).send(new Message('Null'), Infinity);
        });
        spec.example('if callback used messages sent are acknowledged', spec.asyncResponse(true), function (testNode, returnResponse) {
          spec.hostStore.transport.send(new Message('Null'), function (msg) {
            returnResponse(testNode, msg);
          });
        });
      });
      spec.heading('close()', function () {
        spec.xexample('Transport must be connected (async error message)', spec.asyncResponse('jobs done'), function (testNode, returnResponse) {
          new Transport("", function () {
            this.close(); // TODO can't open 2 transports to same URL so can't test this since it conflicts with hostStore
            returnResponse(testNode, "jobs done");
          });
        });
      });
    });
    //spec.examplesDisabled = false;
  });

});

/**---------------------------------------------------------------------------------------------------------------------
 * lib/interfaces/tgi-core-interfaces-repl.spec.js
 */

spec.testSection('Interfaces');
spec.test('tgi-core/lib/interfaces/tgi-core-interfaces-repl.spec.js', 'REPLInterface', 'Read Evaluate Print Loop Interface', function (callback) {
  spec.heading('REPLInterface', function () {
    spec.paragraph('The REPLInterface is a Read Evaluate Print Loop Interface.');
    spec.heading('CONSTRUCTOR', function () {
      spec.runnerInterfaceConstructor(REPLInterface);
    });
    spec.runnerInterfaceMethods(REPLInterface);
    spec.heading('METHODS', function () {
      spec.paragraph('The REPLInterface defines adds the following methods.');
      spec.paragraph('evaluateInput(line)');
      spec.example('called when line of input available', 'function', function () {
        return typeof REPLInterface.prototype.evaluateInput;
      });
      spec.example('if no input state error generated', undefined, function () {
      });
      spec.paragraph('captureOutput(callback)');
      spec.example('called when line of input available', 'function', function () {
        return typeof REPLInterface.prototype.captureOutput;
      });
      spec.paragraph('capturePrompt(callback)');
      spec.example('called when line of input available', 'function', function () {
        return typeof REPLInterface.prototype.capturePrompt;
      });
    });
    spec.heading('INTEGRATION', function () {
      spec.example('user queries', spec.asyncResults('done'), function (callback) {
        var repl = new REPLInterface();
        var app = new Application({interface: repl});
        var ex = this;
        repl.captureOutput(function (text) {
          ex.log('out> ' + text);
          //console.log('out> ' + text);
        });
        repl.evaluateInput('input ignored if no context for it');
        var input = function (text) {
          ex.log('in> ' + text);
          //console.log('in> ' + text);
          repl.evaluateInput(text);
        };
        /**
         * test per function
         */
        var ok1 = function () {
          app.ok('This is a test.', function () {
            yesno1();
          });
          input('whatever');
        };
        var yesno1 = function () {
          app.yesno('Are we having fun?', function (answer) {
            if (answer) {
              callback(answer);
            } else {
              yesno2();
            }
          });
          input('nope'); // this will be ignored
          input('n'); // this will be ignored
        };
        var yesno2 = function () {
          app.yesno('Should I continue?', function (answer) {
            if (answer) {
              ask1();
            } else {
              callback(answer);
            }
          });
          input('yeppers'); // this will be ignored
          input('y');
        };
        var ask1 = function () {
          app.ask('What is your name?', function (answer) {
            repl.info('Nice to meet you ' + answer + '.');
            if (answer == 'Sean') {
              choose1();
            } else {
              callback(answer);
            }
          });
          input('Sean');
        };
        var choose1 = function () {
          app.choose('Pick one...', ['Eenie', 'Meenie', 'Miney', 'Moe'], function (choice) {
            if (choice == 1)
              callback('done');
            else
              callback(choice);
          });
          input('m'); // first partial match
        };
        /**
         * Start the first test
         */
        ok1();
      });
      spec.example('app navigation', spec.asyncResults('RockPaperScissors'), function (callback) {
        var repl = new REPLInterface();
        var app = new Application({interface: repl});
        var ex = this;
        repl.captureOutput(function (text) {
          ex.log('out> ' + text);
          //console.log('out> ' + text);
        });
        var input = function (text) {
          ex.log('in> ' + text);
          //console.log('in> ' + text);
          repl.evaluateInput(text);
        };

        var answer = '';
        var rockCommand = new Command({
          name: 'Rock', type: 'Function', contents: function () {
            answer += 'Rock';
          }
        });
        var paperCommand = new Command({
          name: 'Paper', type: 'Function', contents: function () {
            answer += 'Paper';
          }
        });
        var scissorsCommand = new Command({
          name: 'Scissors', type: 'Function', contents: function () {
            answer += 'Scissors';
          }
        });
        var seeYouCommand = new Command({
          name: 'SeeYou', type: 'Function', contents: function () {
            callback(answer);
          }
        });
        var menu = new Presentation();
        menu.set('name', 'Public Menu');
        menu.set('contents', [
          'Strings are ignored',
          new Attribute({name: 'ignoredAlso'}),
          rockCommand,
          paperCommand,
          scissorsCommand,
          seeYouCommand
        ]);
        app.setPresentation(menu);
        app.start(function () {
          ex.log('app got stuff: ' + JSON.stringify(stuff));
          //console.log('app got stuff: ' + JSON.stringify(stuff));
        });
        input('Rockaby');
        input('r');
        input('p');
        input('s');
        input('se');
      });
    });
  });
});
/*
 - REPLInterface needs to add capturePrompt along with captureOutput to signal when to prompt
 - REPLInterface - handle submenu
 - REPLInterface - fix queries
* */
/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/models/tgi-core-model-application.test.js
 */
spec.testSection('Models');
spec.test('tgi-core/lib/models/tgi-core-model-application.spec.js', 'Application', 'manages active state and configuration', function (callback) {
  spec.heading('CONSTRUCTOR', function () {
    spec.example('objects created should be an instance of Application', true, function () {
      return new Application() instanceof Application;
    });
    spec.testModel(Application);
    spec.example('argument property interface will invoke setInterface method', true, function () {
      var myInterface = new Interface();
      var myApplication = new Application({interface: myInterface});
      return (myApplication.getInterface() === myInterface);
    });

  });
  spec.heading('ATTRIBUTES', function () {
    spec.paragraph('Application extends model and inherits the attributes property.  All Application objects ' +
    'have the following attributes:');
    spec.example('following attributes are defined:', undefined, function () {
      var presentation = new Application(); // default attributes and values
      this.shouldBeTrue(presentation.get('name') === 'newApp');
      this.shouldBeTrue(presentation.get('brand') === 'NEW APP');
    });
  });
  spec.heading('METHODS', function () {
    spec.heading('setInterface(interface)', function () {
      spec.paragraph('Setting the interface for the application determines the primary method of user interaction.');
      spec.example('must supply Interface object', Error('instance of Interface a required parameter'), function () {
        new Application().setInterface();
      });
    });
    spec.heading('getInterface()', function () {
      spec.paragraph('returns primary user interface for application');
      spec.example('default is undefined', true, function () {
        return new Application().getInterface() === undefined;
      });
      spec.example('returns value set by set Interface', true, function () {
        var myInterface = new Interface();
        var myApplication = new Application();
        myApplication.setInterface(myInterface);
        return (myApplication.getInterface() === myInterface);
      });
    });
    spec.heading('setPresentation(presentation)', function () {
      spec.paragraph('Setting the presentation for the application determines the primary commands available to the user.');
      spec.example('must supply Presentation object', Error('instance of Presentation a required parameter'), function () {
        new Application().setPresentation();
      });
    });
    spec.heading('getPresentation()', function () {
      spec.paragraph('returns primary user presentation for application');
      spec.example('default is undefined', true, function () {
        return new Application().getPresentation() === undefined;
      });
      spec.example('returns value set by set Presentation', true, function () {
        var myPresentation = new Presentation();
        var myApplication = new Application();
        myApplication.setPresentation(myPresentation);
        return (myApplication.getPresentation() === myPresentation);
      });
    });
    spec.heading('start()', function () {
      spec.paragraph('The start method executes the application.');
      spec.example('must set interface before starting', Error('error starting application: interface not set'), function () {
        new Application().start();
      });
      spec.example('callback parameter required', Error('callback required'), function () {
        new Application({interface: new Interface()}).start();
      });
    });
    spec.heading('dispatch()', function () {
      spec.paragraph('The dispatch method will accept a request and act on it or pass it to the app.');
      spec.example('must pass a Request object', Error('Request required'), function () {
        new Application().dispatch();
      });
      spec.example('send command without callback when no response needed', undefined, function () {
        var ex = this;
        new Application().dispatch(new Request({
          type: 'Command', command: new Command(function () {
            ex.log('PEACE');
          })
        }));
      });
      spec.example('optional second parameter is the response callback', Error('response callback is not a function'), function () {
        new Application().dispatch(new Request({type: 'Command', command: new Command()}), true);
      });
    });
    spec.heading('ok(prompt, callback)', function () {
      spec.paragraph('Pause before proceeding');
      spec.example('must set interface before invoking', Error('interface not set'), function () {
        new Application().ok();
      });
      spec.example('must provide the text prompt param', Error('prompt required'), function () {
        new Application({interface: new Interface()}).ok();
      });
      spec.example('must provide callback param', Error('callback required'), function () {
        new Application({interface: new Interface()}).ok('You are about to enter the twilight zone.');
      });
    });
    spec.heading('yesno(prompt, callback)', function () {
      spec.paragraph('Query user with a yes no question.');
      spec.example('must set interface before invoking', Error('interface not set'), function () {
        new Application().yesno();
      });
      spec.example('must provide the text question param', Error('prompt required'), function () {
        new Application({interface: new Interface()}).yesno();
      });
      spec.example('must provide callback param', Error('callback required'), function () {
        new Application({interface: new Interface()}).yesno('ok?');
      });
    });
    spec.heading('ask(prompt, attribute, callback)', function () {
      spec.paragraph('Simple single item prompt.');
      spec.example('must set interface before invoking', Error('interface not set'), function () {
        new Application().ask();
      });
      spec.example('must provide the text question param', Error('prompt required'), function () {
        new Application({interface: new Interface()}).ask();
      });
      spec.example('next param is attribute or callback', Error('attribute or callback expected'), function () {
        new Application({interface: new Interface()}).ask('sup');
      });
      spec.example('must provide callback param', Error('callback required'), function () {
        new Application({interface: new Interface()}).
          ask('Please enter your name', new Attribute({name: 'Name'}));
      });
    });
    spec.heading('choose', function () {
      spec.paragraph('prompt to choose an item');
      spec.example('must set interface before invoking', Error('interface not set'), function () {
        new Application().choose();
      });
      spec.example('must provide text prompt first', Error('prompt required'), function () {
        new Application({interface: new Interface()}).choose();
      });
      spec.example('must supply array of choices', undefined, function () {
        var myApplication = new Application({interface: new Interface()});

        this.shouldThrowError(Error('choices array required'), function () {
          myApplication.choose('What it do');
        });
        this.shouldThrowError(Error('choices array required'), function () {
          myApplication.choose('this will not', 'work');
        });
        this.shouldThrowError(Error('choices array empty'), function () {
          myApplication.choose('empty array?', []);
        });
      });
      spec.example('must provide callback param', Error('callback required'), function () {
        var myApplication = new Application();
        myApplication.setInterface(new Interface());
        myApplication.choose('choose wisely', ['rock', 'paper', 'scissors']);
      });
    });
  });
  spec.heading('Application Integration', function () {
    spec.example('minimal app', spec.asyncResults('hello world'), function (callback) {
      // Here is our app
      var ui = new Interface();
      var app = new Application();
      app.setInterface(ui);
      app.start(console.log);
      // define command to satisfy test
      var helloWorldCommand = new Command(function () {
        callback('hello world');
      });
      // mock ui command request - this will get executed by app directly
      ui.mockRequest(new Request({type: 'Command', command: helloWorldCommand}));
    });
    spec.example('little app with command execution mocking', spec.asyncResults(true), function (callback) {
      // todo delamify this
      // Send 4 mocks and make sure we get 4 callback calls
      var self = this;
      self.callbackCount = 0;
      var app = new Application();
      var testInterface = new Interface();
      var testPresentation = new Presentation();
      app.setInterface(testInterface);
      app.setPresentation(testPresentation);
      app.start(function (request) {
        if (request.type == 'mock count')
          self.callbackCount++;
        if (self.callbackCount > 3)
          callback(true);
      });
      var cmds = [];
      var i;
      for (i = 0; i < 4; i++) {
        cmds.push(new Request('mock count'));
      }
      testInterface.mockRequest(cmds);
    });
  });
});


/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/models/tgi-core-model-log.test.js
 */
spec.test('tgi-core/lib/models/tgi-core-model-log.spec.js', 'Log', 'information for recall', function (callback) {
  spec.heading('Log Model', function () {
    spec.paragraph('Multi purpose log model.');
    spec.heading('CONSTRUCTOR', function () {
      spec.example('objects created should be an instance of Workspace', true, function () {
        return new Log() instanceof Log;
      });
      spec.testModel(Log);
      spec.heading('ATTRIBUTES', function () {
        spec.example('following attributes are defined:', undefined, function () {
          var log = new Log('what up'); // default attributes and values
          this.shouldBeTrue(log.get('id') !== undefined);
          this.shouldBeTrue(log.get('dateLogged') instanceof Date);
          this.log(log.get('dateLogged'));
          this.shouldBeTrue(log.get('logType') == 'Text');
          this.shouldBeTrue(log.get('importance') == 'Info');
          this.shouldBeTrue(log.get('contents') == 'what up');
        });
      });
      spec.heading('LOG TYPES', function () {
        spec.example('must be valid', Error('Unknown log type: wood'), function () {
          this.log('T.getLogTypes()');
          new Log({logType: 'wood'}); // default attributes and values
        });
        spec.example('Text simple text message', 'Info: sup', function () {
          return new Log('sup');
        });
        spec.example('Delta logged Delta (see in Core)', 'Info: (delta)', function () {
          var delta = new Delta(new Attribute.ModelID(new Model()));
          return new Log({logType: 'Delta', contents: delta}).toString();
        });
      });
    });
  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/models/tgi-core-model-presentation.test.js
 */
spec.test('tgi-core/lib/models/tgi-core-model-presentation.spec.js', 'Presentation', 'used by Interface to render data', function (callback) {
  spec.heading('Presentation Model', function () {
    spec.paragraph('The Presentation Model represents the way in which a model is to be presented to the user.  ' +
    'The specific Interface object will represent the model data according to the Presentation object.');
    spec.heading('CONSTRUCTOR', function () {
      spec.example('objects created should be an instance of Presentation', true, function () {
        return new Presentation() instanceof Presentation;
      });
      spec.testModel(Presentation);
    });
    spec.heading('PROPERTIES', function () {
      spec.heading('model', function () {
        spec.paragraph('This is a model instance for the presentation instance.');
      });
      spec.heading('validationErrors', function () {
        spec.example('Array of errors', undefined, function () {
          this.shouldBeTrue(new Presentation().validationErrors instanceof Array);
          this.shouldBeTrue(new Presentation().validationErrors.length === 0);
        });
      });
      spec.heading('validationMessage', function () {
        spec.example('string description of error(s)', '', function () {
          return new Presentation().validationMessage;
        });
      });
    });
    spec.heading('ATTRIBUTES', function () {
      spec.paragraph('Presentation extends model and inherits the attributes property.  All Presentation objects ' +
      'have the following attributes:');
      spec.example('following attributes are defined:', undefined, function () {
        var presentation = new Presentation(); // default attributes and values
        this.shouldBeTrue(presentation.get('id') === null);
        this.shouldBeTrue(presentation.get('name') === null);
        this.shouldBeTrue(presentation.get('modelName') === null);
        this.shouldBeTrue(presentation.get('contents') instanceof Array);
      });
    });
    spec.heading('METHODS', function () {
      spec.heading('modelConstructor', function () {
        spec.paragraph('This is a reference to the constructor function to create a new model');
        //spec.xexample('', undefined, function () {
        //});
      });
      spec.heading('validate', function () {
        spec.paragraph('check valid object state then extend to presentation contents');
        spec.example('callback is required -- see integration', Error('callback is required'), function () {
          new Presentation().validate();
        });
      });
    });
    spec.heading('CONTENTS', function () {
      spec.paragraph('The contents attributes provides the structure for the presentation.');
      spec.example('content must be an array', 'contents must be Array', function () {
        var pres = new Presentation();
        pres.set('contents', true);
        return pres.getObjectStateErrors();
      });
      spec.example('array elements must be Command , Attribute or String', 'contents elements must be Command, Attribute or string', function () {
        var pres = new Presentation();
        // strings with prefix # are heading, a dash - by itself is for a visual separator
        pres.set('contents', ['#heading', new Command(), new Attribute({name: 'meh'})]);
        this.shouldBeTrue(pres.getObjectStateErrors().length === 0);
        pres.set('contents', [new Command(), new Attribute({name: 'meh'}), true]);
        return pres.getObjectStateErrors();
      });
    });
    spec.heading('INTEGRATION', function () {
      spec.example('validation usage demonstrated', spec.asyncResults('contents has validation errors'), function (callback) {
        var attribute = new Attribute({name: 'test'});
        var presentation = new Presentation(); // default attributes and values
        presentation.set('contents', [attribute]);
        attribute.setError('test', 'test error');
        presentation.validate(function () {
          callback(presentation.validationMessage);
        });
      });
      spec.example('use REPLInterface to view and edit', undefined, function () {
        var repl = new REPLInterface();
        var ex = this;
        repl.captureOutput(function (text) {
          ex.log('out> ' + text);
          //console.log('out> ' + text);
        });
        repl.capturePrompt(function (text) {
          ex.log('prompt> ' + text);
          //console.log('prompt> ' + text);
        });
        var input = function (text) {
          ex.log('in> ' + text);
          //console.log('in> ' + text);
          repl.evaluateInput(text);
        };
        /**
         * Here is the presentation
         */
        var firstName = new Attribute({name: 'firstName'});
        var lastName = new Attribute({name: 'lastName'});
        var presentation = new Presentation();
        presentation.set('contents', [
          '##TITLE',
          'Here is **text**.  _Note it uses markdown_.  Eventually this will be **stripped** out!',
          'Here are some attributes:',
          firstName,
          lastName
        ]);
        firstName.value = 'Elmer';
        lastName.value = 'Fud';
        /**
         * Create a command to view it (default mode)
         */
        var presentationCommand = new Command({name: 'Presentation', type: 'Presentation', contents: presentation});
        presentationCommand.onEvent('*', function (event, err) {
          var eventDesc = 'event> ' + event + (err || ' ok');
          ex.log(eventDesc);
          //console.log(eventDesc);
        });
        presentationCommand.execute(repl);
        /**
         * Now edit it
         */
        presentationCommand.presentationMode = 'Edit';
        presentationCommand.execute(repl);
        input('John');
        input('Doe');
        /**
         * View again
         */
        presentationCommand.presentationMode = 'View';
        presentationCommand.execute(repl);
      });
    });
  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * /tgi-core/lib/models/tgi-core-model-session.test.js
 */
spec.test('/tgi-core/lib/models/tgi-core-model-session.spec.js', 'Session', 'for user host access', function (callback) {
  spec.heading('Session Model', function () {
    spec.paragraph('The Session Model represents the Session logged into the system. The library uses this for system' +
      ' access, logging and other functions.');
    spec.heading('CONSTRUCTOR', function () {
      spec.example('objects created should be an instance of Session', true, function () {
        return new Session() instanceof Session;
      });
      spec.testModel(Session, true);
    });
    spec.heading('ATTRIBUTES', function () {
      spec.example('following attributes are defined:', undefined, function () {
        var session = new Session(); // default attributes and values
        this.shouldBeTrue(session.get('id') === null);
        this.shouldBeTrue(session.get('userID') instanceof Attribute.ModelID);
        this.shouldBeTrue(session.get('userID').modelType == 'User');
        this.shouldBeTrue(session.get('dateStarted') instanceof Date);
        this.shouldBeTrue(session.get('passCode') === null);
        this.shouldBeTrue(session.get('ipAddress') === null);
        this.shouldBeTrue(session.get('active') === false);
      });
    });
    spec.heading('METHODS', function () {
      spec.heading('startSession()', function () {
        spec.paragraph('This method will create a new session record for a user.');
        spec.example('parameters are store, user, password, IP and callback', undefined, function () {
          this.shouldThrowError(Error('store required'), function () {
            new Session().startSession();
          });
          this.shouldThrowError(Error('userName required'), function () {
            new Session().startSession(new Store());
          });
          this.shouldThrowError(Error('password required'), function () {
            new Session().startSession(new Store(), 'blow');
          });
          this.shouldThrowError(Error('ip required'), function () {
            new Session().startSession(new Store(), 'blow', 'me');
          });
          this.shouldThrowError(Error('callback required'), function () {
            new Session().startSession(new Store(), 'blow', 'me', 'ipman');
          });
        });
      });
      spec.heading('resumeSession()', function () {
        spec.paragraph('This method will resume an existing session.');
        spec.example('parameters are store, IP, passcode and callback', undefined, function () {
          this.shouldThrowError(Error('store required'), function () {
            new Session().resumeSession();
          });
          this.shouldThrowError(Error('ip required'), function () {
            new Session().resumeSession(new Store());
          });
          this.shouldThrowError(Error('passCode required'), function () {
            new Session().resumeSession(new Store(), 'ipman');
          });
          this.shouldThrowError(Error('callback required'), function () {
            new Session().resumeSession(new Store(), 'ipman', '123');
          });
        });
      });
      spec.heading('endSession()', function () {
        spec.paragraph('Method to end session.');
        spec.example('parameters are store and callback - session object should be in memory', undefined, function () {
          this.shouldThrowError(Error('store required'), function () {
            new Session().endSession();
          });
          this.shouldThrowError(Error('callback required'), function () {
            new Session().endSession(new Store());
          });
        });
      });
    });
    // spec.runnerSessionIntegration();
  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/models/tgi-core-model-user.test.js
 */
spec.test('tgi-core/lib/models/tgi-core-model-user.spec.js', 'User', 'access, logging and other stuff todo with humans', function (callback) {
  spec.heading('User Model', function () {
    spec.paragraph('The User Model represents the user logged into the system. The library uses this for system' +
      ' access, logging and other functions.');
    spec.heading('CONSTRUCTOR', function () {
      spec.example('objects created should be an instance of User', true, function () {
        return new User() instanceof User;
      });
      spec.testModel(User, true);
    });
    spec.heading('ATTRIBUTES', function () {
      spec.example('following attributes are defined:', undefined, function () {
        var user = new User(); // default attributes and values
        this.shouldBeTrue(user.get('id') === null);
        this.shouldBeTrue(user.get('name') === null);
        this.shouldBeTrue(user.get('active') === false);
        this.shouldBeTrue(user.get('password') === null);
        this.shouldBeTrue(user.get('firstName') === null);
        this.shouldBeTrue(user.get('lastName') === null);
        this.shouldBeTrue(user.get('email') === null);
      });
    });
  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/models/tgi-core-model-workspace.test.js
 */
spec.test('tgi-core/lib/models/tgi-core-model-workspace.spec.js', 'Workspace', 'of active Models for user', function (callback) {
  spec.heading('Workspace Model', function () {
    spec.paragraph('A workspace is a collection of active deltas for a user.  The GUI could represent that as open' +
      'tabs for instance.  Each tab a model view.  The deltas represent the change in model state');
    spec.heading('CONSTRUCTOR', function () {
      spec.example('objects created should be an instance of Workspace', true, function () {
        return new Workspace() instanceof Workspace;
      });
      spec.testModel(Workspace, true);
    });
    spec.heading('ATTRIBUTES', function () {
      spec.example('following attributes are defined:', undefined, function () {
        var user = new Workspace(); // default attributes and values
        this.shouldBeTrue(user.get('id') !== undefined);
        this.shouldBeTrue(user.get('user') instanceof Attribute.ModelID);
        this.shouldBeTrue(user.get('user').modelType == 'User');
        this.shouldBeTrue(typeof user.get('deltas') == 'object');
      });
    });
    spec.heading('METHODS', function () {
      spec.paragraph('loadUserWorkspace(user, callback)');
      spec.paragraph('sync');
    });
    spec.heading('INTEGRATION', function () {
      //spec.example('Workspace usage', undefined, function () {
      //});
    });
  });
});
/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/stores/tgi-core-store-memory.test.js
 */
spec.testSection('Stores');
spec.test('tgi-core/lib/stores/tgi-core-store-memory.spec.js', 'MemoryStore', 'volatile memory store in js codespace', function (callback) {
  spec.heading('MemoryStore', function () {
    spec.paragraph('The MemoryStore is a simple volatile store. ' +
      'It is the first test standard to define the spec for all Stores to follow.');
    spec.heading('CONSTRUCTOR', function () {
      spec.heading('Store Constructor tests are applied', function () {
        spec.runnerStoreConstructor(MemoryStore);
      });
      spec.example('objects created should be an instance of MemoryStore', true, function () {
        return new MemoryStore() instanceof MemoryStore;
      });
    });
    spec.heading('Store tests are applied', function () {
      spec.runnerStoreMethods(MemoryStore);
    });
  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/utility/tgi-core-arrays.spec.js
 */
spec.testSection('Utility Functions');
spec.test('tgi-utility/lib/tgi-utility-arrays.test.js', 'Array Functions', 'description', function (callback) {
  callback({log: 'tgi-utility/lib/tgi-utility-arrays.test.js'});
  spec.heading('ARRAY FUNCTIONS', function () {
    spec.heading('contains(array,object)', function () {
      spec.paragraph('This method returns true or false as to whether object is contained in array.');
      spec.example('object exists in array', true, function () {
        return contains(['moe', 'larry', 'curley'], 'larry');
      });
      spec.example('object does not exist in array', false, function () {
        return contains(['moe', 'larry', 'curley'], 'shemp');
      });
    });
  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/utility/tgi-core-objects.spec.js
 */
spec.test('tgi-utility/lib/tgi-utility-objects.test.js', 'Object Functions', 'description', function (callback) {
  spec.heading('inheritPrototype(p)', function () {
    spec.paragraph('kinda sorta class like');
    spec.example('Cannot pass null', undefined, function () {
      this.shouldThrowError('*', function () {
        inheritPrototype(null);
      });
    });
    spec.example('quack like a duck', 'quack', function () {
      // Duck class
      var Duck = function () {
      };
      // Duck method
      Duck.prototype.sound = function () {
        return 'quack';
      };
      // Mallard class
      var Mallard = function () {
      };
      // Mallard inherits Duck prototype
      Mallard.prototype = inheritPrototype(Duck.prototype);
      // Create instance
      var daffy = new Mallard();

      // Instance of constructor & the inherited prototype's class fir daffy
      this.shouldBeTrue(daffy instanceof Mallard);
      this.shouldBeTrue(daffy instanceof Duck);

      // What sound does daffy make?
      return daffy.sound();
    });
  });
  spec.heading('getInvalidProperties(args,allowedProperties)', function () {
    spec.paragraph('Functions that take an object as it\'s parameter use this to validate the ' +
    'properties of the parameter by returning any invalid properties');
    spec.example('valid property', 'Kahn', function () {
      // got Kahn and value backwards so Kahn is an unknown property
      return getInvalidProperties({name: 'name', Kahn: 'value'}, ['name', 'value'])[0];
    });
    spec.example('invalid property', 0, function () {
      // no unknown properties
      return getInvalidProperties({name: 'name', value: 'Kahn'}, ['name', 'value']).length;
    });
  });
});

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/utility/tgi-core-strings.spec.js
 */

spec.test('tgi-utility/lib/tgi-utility-strings.test.js', 'String Functions', 'description', function (callback) {
  spec.heading('STRING FUNCTIONS', function () {
    spec.heading('trim(string)', function () {
      spec.example('Remove leading and trailing spaces from string', '(hello)', function () {
        return '(' + trim(' hello ') + ')';
      });
    });
    spec.heading('ltrim(string)', function () {
      spec.example('Remove leading spaces from string', '(hello )', function () {
        return '(' + ltrim(' hello ') + ')';
      });
    });
    spec.heading('rtrim(string)', function () {
      spec.example('Remove trailing spaces from string', '( hello)', function () {
        return '(' + rtrim(' hello ') + ')';
      });
    });
    spec.heading('left(string)', function () {
      spec.example('return left part of string', '123', function () {
        return left('12345',3);
      });
    });
    spec.heading('right(string)', function () {
      spec.example('return right part of string', '345', function () {
        return right('12345',3);
      });
    });
    spec.heading('center(string)', function () {
      spec.example('return center part of string', '234', function () {
        return center('12345',3);
      });
    });
    spec.heading('lpad(string, length, fillChar)', function () {
      spec.paragraph('Return string size length with fillChar padded on left.  ' +
      'fillChar is optional and defaults to space.');
      spec.example('add leading asteriks', '********42', function () {
        return lpad('42', 10, '*');
      });
      spec.example('truncate when length is less than string length', 'ok', function () {
        return lpad('okay', 2);
      });
      spec.example('fillChar defaults to space', ': x:', function () {
        return ':' + lpad('x',2) + ':';
      });
    });
    spec.heading('rpad(string, length, fillChar)', function () {
      spec.paragraph('Return string size length with fillChar padded on right.  ' +
      'fillChar is optional and defaults to space.');
      spec.example('Add trailing periods', 'etc...', function () {
        return rpad('etc', 6, '.');
      });
      spec.example('truncate when length is less than string length', 'sup', function () {
        return rpad('wassup', 3);
      });
      spec.example('fillChar defaults to space', ':x :', function () {
        return ':' + rpad('x',2) + ':';
      });
    });
    spec.heading('cpad(string, length, fillChar)', function () {
      spec.paragraph('Return string size length with fillChar padded on left and right.  ' +
      'fillChar is optional and defaults to space.');
      spec.example('center with periods', '...center....', function () {
        return cpad('center', 13, '.');
      });
      spec.example('truncate when length is less than string length', 'cd', function () {
        return cpad('abcdef', 2);
      });
      spec.example('fillChar defaults to space', ': x :', function () {
        return ':' + cpad('x',3) + ':';
      });
    });
  });
});

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

/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/lib/misc/test-footer
 **/
};
  /* istanbul ignore next */
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = testSpec;
    }
    exports.testSpec = testSpec;
  } else {
    root.testSpec = testSpec;
  }
}).call(this);