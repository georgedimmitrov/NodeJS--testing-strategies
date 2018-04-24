const _ = require('underscore');
const moment = require('moment');

const MembershipApplication = function(args = {}) {

  _.extend(this, args);

  this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, 'days');

  this.expired = () => {
    return this.validUntil.isBefore(moment());
  };

  this.emailIsValid = () => {
    return this.email && this.email.length > 3 && this.email.indexOf('@') > -1;
  };

  this.heightIsValid = () => {
    return this.height && this.height > 60 && this.height < 75;
  };

  this.ageIsValid = () => {
    return this.age && this.age > 15 && this.age < 100;
  };

  this.weightIsValid = () => {
    return this.weight && this.weight > 100 && this.weight < 300;
  };

  this.nameIsValid = () => {
    return this.first && this.last;
  };

  this.validationMessage = () => {
    if (this.isValid()) {
      return 'Application is valid';
    } else if (!this.emailIsValid()) {
      return 'Email is invalid';
    } else if (!this.ageIsValid()) {
      return 'Age is outside our limits of 15 and 100 years';
    } else if (!this.heightIsValid()) {
      return 'Height is outside our limits of 60 and 75 inches';
    } else if (!this.weightIsValid()) {
      return 'Weight is outside our limits of 100 and 300 pounds';
    } else if (!this.nameIsValid()) {
      return 'A first and last name is required';
    } else if (this.expired()) {
      return 'This application is expired';
    }
  };

  this.isValid = () => {
    return this.emailIsValid() &&
      this.heightIsValid() &&
      this.ageIsValid() &&
      this.weightIsValid() &&
      !this.expired();
  };

};

module.exports = MembershipApplication;