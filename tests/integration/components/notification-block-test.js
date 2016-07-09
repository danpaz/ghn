import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('notification-block', 'Integration | Component | notification block', {
  integration: true
});

test('it shows no comments', function(assert) {
  this.render(hbs`
    {{#notification-block}}
      Doesn't matter.
    {{/notification-block}}
  `);

  assert.equal(this.$('.notification-block__no-comments').text().trim(), 'No comments yet.');
});
