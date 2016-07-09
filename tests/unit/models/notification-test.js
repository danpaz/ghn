import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('notification', 'Unit | Model | notification', {
  // Specify the other units that are required for this test.
  needs: [
    'model:issue-comment',
    'model:review-comment',
    'model:issue-event',
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it merges issue- and review-comments', function (assert) {
  let store = this.store();
  let model = this.subject();
  Ember.run(() => {
    store.createRecord('issue-comment', {notification: model});
    store.createRecord('review-comment', {notification: model});
  });
  assert.equal(model.get('comments.length'), 2);
});

test('it filters events by hasIcon', function (assert) {
  let store = this.store();
  let model = this.subject();
  Ember.run(() => {
    store.createRecord('issue-event', {
      notification: model,
      hasIcon: true,
    });
    store.createRecord('issue-event', {
      notification: model,
      hasIcon: false,
    });
  });
  assert.equal(model.get('events.length'), 1);
});

test('it merges comments and events', function (assert) {
  let store = this.store();
  let model = this.subject();
  Ember.run(() => {
    store.createRecord('issue-comment', {notification: model});
    store.createRecord('review-comment', {notification: model});
    store.createRecord('issue-event', {
      notification: model,
      hasIcon: true,
    });
  });
  assert.equal(model.get('activity.length'), 3);
});

test('it sorts unread activity by ascending created date', function (assert) {
  let store = this.store();
  let model = this.subject({lastreadat: '2016-02-14T12:00:00Z'});
  Ember.run(() => {
    store.createRecord('issue-comment', {
      id: 1,
      notification: model,
      created: '2016-02-01T12:00:00Z',
    });
    store.createRecord('review-comment', {
      id: 2,
      notification: model,
      created: '2016-01-01T12:00:00Z',
    });
    store.createRecord('issue-event', {
      id: 3,
      notification: model,
      hasIcon: true,
      created: '2016-04-01T12:00:00Z',
    });
    store.createRecord('issue-comment', {
      id: 4,
      notification: model,
      created: '2016-03-01T12:00:00Z',
    });
  });
  assert.equal(model.get('sortedUnreadActivity').length, 2);
  assert.equal(model.get('sortedUnreadActivity')[0].id, 4);
  assert.equal(model.get('sortedUnreadActivity')[1].id, 3);
});

test('it sorts read activity by ascending created date', function (assert) {
  let store = this.store();
  let model = this.subject({lastreadat: '2016-02-14T12:00:00Z'});
  Ember.run(() => {
    store.createRecord('issue-comment', {
      id: 1,
      notification: model,
      created: '2016-02-01T12:00:00Z',
    });
    store.createRecord('review-comment', {
      id: 2,
      notification: model,
      created: '2016-01-01T12:00:00Z',
    });
    store.createRecord('issue-event', {
      id: 3,
      notification: model,
      hasIcon: true,
      created: '2016-04-01T12:00:00Z',
    });
    store.createRecord('issue-comment', {
      id: 4,
      notification: model,
      created: '2016-03-01T12:00:00Z',
    });
  });
  assert.equal(model.get('sortedReadActivity').length, 2);
  assert.equal(model.get('sortedReadActivity')[0].id, 2);
  assert.equal(model.get('sortedReadActivity')[1].id, 1);
});
