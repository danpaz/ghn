/**
 * Polling service from http://yoranbrondsema.com/live-polling-system-ember-js.
 */
import Ember from 'ember';

export default Ember.Service.extend({

  /**
   * Time interval at which to poll, in milliseconds.
   *
   * @type {integer}
   */
  interval: 60000,

  /**
   * Function to call at a regular interval. Usually defined in the route.
   *
   * @type {function}
   */
  onPoll: null,

  /**
   * Timer instance.
   *
   * @type {object}
   */
  timer: null,

  /**
   * Schedules the function `f` to be executed every `interval` time.
   *
   * @param {function} f Function to execute.
   */
  schedule: function(f) {
    return Ember.run.later(this, function() {
      f.apply(this);
      this.set('timer', this.schedule(f));
    }, this.get('interval'));
  },

  /**
   * Stops the polling.
   */
  stop: function() {
    Ember.run.cancel(this.get('timer'));
  },

  /**
   * Starts the polling. i.e. executes the `onPoll` function every interval.
   */
  start: function() {
    this.set('timer', this.schedule(this.get('onPoll')));
  },

});
