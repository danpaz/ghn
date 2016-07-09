import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {
    if (!this.get('session.isAuthenticated')) {
      return this.get('session').fetch().catch(() => {});
    }
  },

  actions: {
    authenticate() {
      this.get('session').open('firebase', { provider: 'github', settings: { scope: 'repo' }})
        .then(() => {
          this.transitionTo('notifications');
        });
    },

    invalidateSession() {
      this.get('session').close()
        .then(() => {
          this.transitionTo('login');
        });
    },

  }


});
