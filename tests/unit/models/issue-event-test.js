import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('issue-event', 'Unit | Model | issue event', {
  // Specify the other units that are required for this test.
  needs: [
    'model:notification',
    'model:issue-comment',
    'model:review-comment',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it marks itself unread', function(assert) {
  let store = this.store();
  let model = this.subject({
    created: 2
  });

  Ember.run(() => {
    store.createRecord('notification', {
      lastreadat: 1,
      issueEvents: [model]
    });
  });

  assert.equal(model.get('unread'), true);
});

test('it marks itself read', function(assert) {
  let store = this.store();
  let model = this.subject({
    created: 1
  });

  Ember.run(() => {
    store.createRecord('notification', {
      lastreadat: 2,
      issueEvents: [model]
    });
  });

  assert.equal(model.get('unread'), false);
});
