const Emitter = require('events').EventEmitter;
const util = require('util');

const ReviewProcess = function(args) {
  let callback;

  // make sure the app is valid
  this.ensureAppValid = (app) => {
    if (app.isValid()) {
      this.emit('validated', app);
    } else {
      this.emit('invalid', app.validationMessage());
    }
  };

  // find the next mission
  this.findNextMission = (app) => {
    // stub
    app.mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: []
    };
    this.emit('mission-selected', app);
  };

  // make sure the role selected is available
  this.roleIsAvailable = (app) => {
    this.emit('role-available', app);
  };

  // make sure height/weight/age is right for role
  this.ensureRoleCompatible = (app) => {
    this.emit('role-compatible', app);
  };

  // accept the app with a message
  this.acceptApplication = (app) => {
    callback(null, {
      success: true,
      message: 'Welcome to the Mars Program'
    });
  };

  // deny the app with a message
  this.denyApplication = (message) => {
    callback(null, {
      success: false,
      message
    });
  };

  this.processApplication = (app, next) => {
    callback = next;
    this.emit('application-received', app);
  };

  // event path
  this.on('application-received', this.ensureAppValid);
  this.on('validated', this.findNextMission);
  this.on('mission-selected', this.roleIsAvailable);
  this.on('role-available', this.ensureRoleCompatible);
  this.on('role-compatible', this.acceptApplication);

  // sad path
  this.on('invalid', this.denyApplication);

};

util.inherits(ReviewProcess, Emitter);

module.exports = ReviewProcess;