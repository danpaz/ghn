import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

  session: Ember.inject.service(),

  body: DS.attr('string'),
  created: DS.attr('string'),
  user: DS.attr('string'),
  avatar: DS.attr('string'),
  url: DS.attr('string'),
  issue: DS.attr('string'),
  repo: DS.attr('string'),
  owner: DS.attr('string'),
  isComment: true,

  notification: DS.belongsTo('notification', { async: true }),

  unread: Ember.computed('notification', function () {
    const notificationLastRead = this.get('notification.lastreadat');
    const created = this.get('created');
    if (!notificationLastRead) {
      return false;
    }

    return created >= notificationLastRead;
  }),

  didLoad() {
    // notification is a DS.PromiseObject.
    this.get('notification').then(() => {
      const isRead = !this.get('unread');
      const isMe = this.get('user') === this.get('session.currentUser.username');
      if (isRead || isMe) {
        return;
      }
      this.get('desktop-notifications').notify('New comment from ' +
        this.get('user') + '\n' +
        this.get('body'));
    });
  },


});
