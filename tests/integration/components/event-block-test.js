import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-block', 'Integration | Component | event block', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('event', {});
  this.render(hbs`{{event-block event=event}}`);

  const text = this.$('.event-block__body-text').text().trim();

  assert.equal(text, 'a few seconds ago');
});

test('it displays the event actor', function(assert) {
  this.set('event', {});
  this.set('event.actor', 'danpaz');
  this.set('event.name', 'ate');
  this.render(hbs`{{event-block event=event}}`);

  const text = this.$('.event-block__body-text').text().trim();
  const containsText = text.indexOf('danpaz') > -1;

  assert.equal(containsText, true);
});

test('it displays the event name', function(assert) {
  this.set('event', {});
  this.set('event.actor', 'danpaz');
  this.set('event.name', 'ate');
  this.render(hbs`{{event-block event=event}}`);

  const text = this.$('.event-block__body-text').text().trim();
  const containsText = text.indexOf('ate') > -1;

  assert.equal(containsText, true);
});

test('it displays the event label', function(assert) {
  this.set('event', {});
  this.set('event.labelname', 'awesome');
  this.set('event.name', 'labeled');
  this.render(hbs`{{event-block event=event}}`);

  const text = this.$('.event-block__body-text').text().trim();
  const containsText = text.indexOf('the awesome label') > -1;

  assert.equal(containsText, true);
});

test('it displays the event label action', function(assert) {
  this.set('event', {});
  this.set('event.labelname', 'awesome');
  this.set('event.name', 'labeled');
  this.set('event.labelAction', 'removed');
  this.render(hbs`{{event-block event=event}}`);

  const text = this.$('.event-block__body-text').text().trim();
  const containsText = text.indexOf('removed the awesome label') > -1;

  assert.equal(containsText, true);
});
