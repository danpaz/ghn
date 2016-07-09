import Ember from 'ember';

export default Ember.Route.extend({

  session: Ember.inject.service('session'),
  poll: Ember.inject.service('poll'),

  queryParams: {
    all: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
  },

  beforeModel(transition) {
    if (!this.get('session.isAuthenticated')) {
      transition.abort();
      this.get('session').set('attemptedTransition', transition);
      this.transitionTo('login');
    }
  },

  model(params) {
    return this.store.query('notification', {
      all: params.all,
      page: params.page,
      per_page: params.per_page,
      rand: Math.random(), // Disable browser cache.
    });
  },

  // Wrap all promises in .all to trigger some behavior after all linked models
  // have been loaded.
  //
  afterModel(notifications = []) {
    let promises = [];
    notifications.map((n) => {
      promises.push(n.get('issueComments'));
      promises.push(n.get('reviewComments'));
      promises.push(n.get('issueEvents'));
    });
    Ember.RSVP.all(promises)
      .finally(() => {
        this.get('desktop-notifications').enable();
      });
  },

  activate() {
    const poll = this.get('poll');
    poll.stop();
    poll.set('onPoll', () => this.refresh());
    poll.start();
  },

  deactivate() {
    this.get('poll').stop();
  },

  actions: {
    refresh() {
      // TODO: Spin the refresh icon.
      this.get('desktop-notifications').disable();
      return this.refresh()
        .then(() => this.get('desktop-notifications').enable());
    },

    error(reason) {
      if (reason.errors[0].status === '401') {
        this.get('session').close()
          .then(() => {
            this.transitionTo('login');
          });
        }
    }
  }

});
