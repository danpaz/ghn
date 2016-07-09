import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({

  host: config.apiHost,

  headers: Ember.computed('session.currentUser.accessToken', function() {
    return {
      "Authorization": "Bearer " + this.get("session.currentUser.accessToken"),
      'Accept': 'application/vnd.github.v3+json',
    };
  }),

});
