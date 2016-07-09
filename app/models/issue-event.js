import Ember from 'ember';
import DS from 'ember-data';

const EVENT_ICON_CLASSES = {
  merged: 'octicon-git-merge state state-merged',
  closed: 'octicon-issue-closed state state-closed',
  reopened: 'octicon-issue-reopened state state-reopened',
  labeled: 'octicon-tag state',
  unlabeled: 'octicon-tag state',
};

export default DS.Model.extend({

  name: DS.attr('string'),
  actor: DS.attr('string'),
  created: DS.attr('string'),
  labelname: DS.attr('string'),
  labelcolor: DS.attr('string'),

  notification: DS.belongsTo('notification', { async: true }),

  iconClass: Ember.computed('name', function() {
    const name = this.get('name');
    return EVENT_ICON_CLASSES[name];
  }),

  hasIcon: Ember.computed('name', function() {
    const name = this.get('name');
    const events = Object.keys(EVENT_ICON_CLASSES);
    return events.contains(name);
  }),

  isEvent: true,

  labelAction: Ember.computed('name', function() {
    const name = this.get('name');
    return name === 'labeled' ? 'added' : 'removed';
  }),

  unread: Ember.computed('notification', function () {
    const notificationLastRead = this.get('notification.lastreadat');
    const created = this.get('created');
    if (!notificationLastRead) {
      return true;
    }

    return created >= notificationLastRead;
  }),

});
