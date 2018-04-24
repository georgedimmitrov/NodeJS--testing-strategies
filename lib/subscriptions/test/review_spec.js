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
    const validationSpy = sinon.spy();
    const missionSpy = sinon.spy();
    const roleAvailableSpy = sinon.spy();
    const roleCompatibleeSpy = sinon.spy();

    before((done) => {
      review.on('validated', validationSpy);
      review.on('mission-selected', missionSpy);
      review.on('role-available', roleAvailableSpy);
      review.on('role-compatible', roleCompatibleeSpy);

      review.processApplication(validApp, (err, result) => {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });

    it('ensures the application is valid', () => {
      assert(validationSpy.called);
    });

    it('selects a mission', () => {
      assert(missionSpy.called);
    });

    it('ensures a role exists', () => {
      assert(roleAvailableSpy.called);
    });

    it('ensures role compatibility', () => {
      assert(roleCompatibleeSpy.called);
    });

  });

});