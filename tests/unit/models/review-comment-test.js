import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('review-comment', 'Unit | Model | review comment', {
  // Specify the other units that are required for this test.
  needs: [
    'model:notification',
    'model:issue-comment',
    'model:issue-event',
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
      reviewComments: [model]
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
      reviewComments: [model]
    });
  });

  assert.equal(model.get('unread'), false);
});
