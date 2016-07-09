import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr('string'),
  type: DS.attr('string'),
  url: DS.attr('string'),
  unread: DS.attr('boolean'),
  issue: DS.attr('string'),
  repo: DS.attr('string'),
  owner: DS.attr('string'),
  lastreadat: DS.attr('string'),

  issueComments: DS.hasMany('issue-comment', { async: true }),
  reviewComments: DS.hasMany('review-comment', { async: true }),
  issueEvents: DS.hasMany('issue-event', { async: true }),

  isPR: Ember.computed.equal('type', 'PullRequest'),
  isIssue: Ember.computed.equal('type', 'Issue'),

  comments: Ember.computed.union('issueComments', 'reviewComments'),
  events: Ember.computed.filterBy('issueEvents', 'hasIcon', true),
  activity: Ember.computed.union('comments', 'events'),
  unreadActivity: Ember.computed.filterBy('activity', 'unread', true),
  readActivity: Ember.computed.filterBy('activity', 'unread', false),
  sorting: ['created:asc'],
  sortedUnreadActivity: Ember.computed.sort('unreadActivity', 'sorting'),
  sortedReadActivity: Ember.computed.sort('readActivity', 'sorting'),

  didLoad() {
    // Don't notify for notifications that have been seen before, meaning they
    // are either not unread, or they have some lastreadat value.
    //
    if (!this.get('unread') || this.get('lastreadat')) {
      return;
    }
    this.get('desktop-notifications').notify('New notification in ' +
      this.get('owner') + '/' + this.get('repo') + '\n' +
      this.get('title'));
  },

});
