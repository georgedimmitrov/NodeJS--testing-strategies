const assert = require('assert');
const sinon = require('sinon');

const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');

describe('The Review Process', () => {
  describe('Receiving a valid application', () => {
    let decision;
    let validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    });

    const review = new ReviewProcess();
    const spy = sinon.spy(validApp, 'emailIsValid');

    before((done) => {
      review.processApplication(validApp, (err, result) => {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });

    it('validates email', () => {
      assert(validApp.emailIsValid.called);
    });

  });

});