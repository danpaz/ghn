import Ember from 'ember';

export default Ember.Route.extend({

  /**
    Checks whether the session is authenticated and if it is aborts the current
    transition and instead transitions to the notifications route.

    Source: ember-simple-auth UnauthenticatedRouteMixin.

    @method beforeModel
    @param {Transition} transition The transition that lead to this route
    @public
  */
  beforeModel(transition) {
    if (this.get('session.isAuthenticated')) {
      transition.abort();
      this.transitionTo('notifications');
    }
  },

  afterModel() {
    Ember.$(document).attr('title', `GHN | Login`);
  }

});
