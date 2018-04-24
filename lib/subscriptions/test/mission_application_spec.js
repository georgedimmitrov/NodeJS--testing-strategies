const assert = require('assert');
const MembershipApplication = require('../models/membership_application');

describe('Membership application requirements', () => {
  let validApp;

  before(() => {
    // arrange the data here
    validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    });
  });

  describe('Application valid if...', () => {
    it('all validators successful', () => {
      assert(validApp.isValid(), 'Not valid');
    });
  });

  describe('Application invalid if...', () => {

    it('is expired', () => {
      const app = new MembershipApplication({ validUntil: Date.parse('01/01/2010') });
      assert(app.expired());
    });

    it('email is 4 characters or less', () => {
      const app = new MembershipApplication({ email: 'dd' });
      assert(!app.emailIsValid());
    });

    it('email does not contain an @', () => {
      const app = new MembershipApplication({ email: 'thething.com' });
      assert(!app.emailIsValid());
    });

    it('email is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.emailIsValid());
    });

    it('height is more than 75 inches', () => {
      const app = new MembershipApplication({ height: 76 });
      assert(!app.heightIsValid());
    });

    it('height is less than 60 inches', () => {
      const app = new MembershipApplication({ height: 10 });
      assert(!app.heightIsValid());
    });

    it('height is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.heightIsValid());
    });

    it('weight is more than 300 inches', () => {
      const app = new MembershipApplication({ weight: 306 });
      assert(!app.weightIsValid());
    });

    it('weight is less than 100 inches', () => {
    const app = new MembershipApplication({ weight: 99 });
      assert(!app.weightIsValid());
    });

    it('weight is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.weightIsValid());
    });

    it('age is more than 100', () => {
      const app = new MembershipApplication({ age: 101 });
      assert(!app.ageIsValid());
    });

    it('age is less than 15', () => {
      const app = new MembershipApplication({ age: 11 });
      assert(!app.ageIsValid());
    });

    it ('age is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.ageIsValid());
    });

    it('first is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.nameIsValid());
    });

    it('last is omitted', () => {
      const app = new MembershipApplication();
      assert(!app.nameIsValid());
    });
  });
});