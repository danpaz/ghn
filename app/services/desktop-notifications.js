import Ember from 'ember';

export default Ember.Service.extend({

  /**
   * The title to display in all notifications.
   *
   * @type {string}
   */
  title: 'Notification Flow',

  /**
   * Whether the user gave this page permission to emit notifications.
   *
   * @type {boolean}
   */
  hasPermission: Ember.computed(function () {
    const N = window.Notification;
    return (N && N.permission && N.permission === 'granted') ? false : true;
  }),

  /**
   * Are notifications enabled? This is separate from the browser's permission
   * state. Disabled by default so that initial page load doesn't trigger a
   * bunch of notifications.
   *
   * @type {boolean}
   */
  enabled: false,

  /**
   * Enable notifications.
   */
  enable() {
    this.set('enabled', true);
  },

  /**
   * Disable notifications.
   */
  disable() {
    this.set('enabled', false);
  },

  /**
   * Spawn a desktop notification that closes automatically after 5 seconds.
   */
  notify(message) {
    if (!this.get('enabled')) {
      console.log('Notifications are disabled!');
      return;
    }
    const title = this.get('title');
    const opts = {
      body: message,
      icon: '/bell-icon.png',
    };
    const n = new Notification(title, opts);

    setTimeout(() => {
      n.close();
    }, 10000);

    return n;
  }
});
