import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: [
    'all',
    'page',
    'per_page',
  ],

  /**
   * Whether to show read notifications (in addition to unread notifications).
   *
   * @type {boolean}
   */
  all: false,

  /**
   * Page number for notifications.
   *
   * @type {integer}
   */
  page: 1,

  /**
   * How many notifications to fetch per page.
   *
   * @type {integer}
   */
  per_page: 10,

  /**
   * The next (older) page of notifications to fetch, if any.
   *
   * @type {integer}
   */
  nextPage: Ember.computed('all', 'page', function() {
    const currentPage = Number(this.get('page')) || 1;
    const modelLength = this.get('model.length');
    const perPage = this.get('per_page');
    if (modelLength < perPage) {
      return null;
    }
    return currentPage + 1;
  }),

  /**
   * The previous (newer) page of notifications to fetch.
   *
   * @type {integer}
   */
  previousPage: Ember.computed('all', 'page', function() {
    const currentPage = Number(this.get('page')) || 1;
    if (currentPage <= 1) {
      return null;
    }
    return currentPage - 1;
  }),

  /**
   * Update the browser's document title to include a count of unread
   * notifications. Trigger this update whenever the model length changes.
   */
  updatePageTitle: function() {
    const model = this.get('model');
    const unread = model.filterBy('unread');
    const len = unread.get('length');

    if (len > 0) {
      Ember.$(document).attr('title', `(${len}) GHN`);
    } else {
      Ember.$(document).attr('title', `GHN`);
    }
  }.observes('model.length'),

  actions: {
    /**
     * Set notification thread as read and remove from the current view without
     * waiting for a response. This action cannot be undone as github does not
     * provide a way to mark notifications as unread.
     *
     * @param {string} id The notification id.
     * @return {void}
     */
    markRead(id) {
      const n = this.store.peekRecord('notification', id);
      n.set('unread', false);
      this.get('model').removeObject(n);
      n.save();
    },

    /**
     * Post a new comment to a thread.
     *
     * @param {string} id  The notification id.
     * @param {string} body The new comment body.
     * @return {Promise}
     */
    postComment(id, body) {
      if (!body) {
        return;
      }
      const n = this.store.peekRecord('notification', id);
      const c = this.store.createRecord('issue-comment', {
        owner: n.get('owner'),
        repo: n.get('repo'),
        issue: n.get('issue'),
        body,
      });
      n.get('issueComments').addObject(c);
      return c.save();
    }
  }

});
