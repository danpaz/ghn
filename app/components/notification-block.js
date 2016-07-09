import Ember from 'ember';

export default Ember.Component.extend({

  classNames: 'notification-block',

  /**
   * Whether to show only unread activity as part of a single notification
   */
  showUnreadOnly: true,

  actions: {
    onClickCheckbox(id) {
      this.get('onClickCheckbox')(id);
    },

    toggleShowRead() {
      this.toggleProperty('showUnreadOnly');
    },
  }

});
