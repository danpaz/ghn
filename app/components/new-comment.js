import Ember from 'ember';

export default Ember.Component.extend({

  classNames: 'new-comment',

  body: '',

  actions: {
    onSubmit(body) {
      this.get('onSubmit')(body);
      this.set('body', '');
    }
  }

});
