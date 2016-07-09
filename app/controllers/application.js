import Ember from 'ember';

export default Ember.Controller.extend({

  showHeaderDropdown: false,

  actions: {
    toggleHeaderDropdown() {
      this.toggleProperty('showHeaderDropdown');
    }
  }

});
