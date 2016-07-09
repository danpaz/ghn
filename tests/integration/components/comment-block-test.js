import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('comment-block', 'Integration | Component | comment block', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('comment', {});
  this.render(hbs`{{comment-block comment=comment}}`);

  const text = this.$('.comment-block__header').text().trim();

  assert.equal(text, 'commented a few seconds ago');
});


test('it displays the user', function(assert) {
  this.set('comment', {});
  this.set('comment.user', 'danpaz');
  this.render(hbs`{{comment-block comment=comment}}`);

  const text = this.$('.comment-block__header').text().trim();

  assert.equal(text, 'danpaz commented a few seconds ago');
});

test('it displays the diff', function(assert) {
  this.set('comment', {});
  this.set('comment.diff', 'some diff');
  this.render(hbs`{{comment-block comment=comment}}`);

  const text = this.$('.comment-block__body-diff').text().trim();

  assert.equal(text, 'some diff');
});

test('it doesn\'t display the diff', function(assert) {
  this.set('comment', {});
  this.render(hbs`{{comment-block comment=comment}}`);

  const text = this.$('.comment-block__body-diff').text().trim();

  assert.equal(text, '');
});
