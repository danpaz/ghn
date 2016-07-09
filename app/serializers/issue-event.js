import Ember from 'ember';
import DS from 'ember-data';

/**
 * Transform a given issue-event to the format ember-data expects.
 *
 * @param {object} obj An issue-event object.
 * @return {object}
 */
export function transform(obj) {
  let labelname, labelcolor;

  // Only 'labeled' and 'unlabeled' events have the label object.
  if (obj.label) {
    labelname = obj.label.name;
    labelcolor = obj.label.color;
  }

  return {
    id: obj.id,
    type: 'issue-event',
    attributes: {
      created: obj.created_at,
      name: obj.event,
      actor: obj.actor.login,
      labelname,
      labelcolor
    },
  };
}

export default DS.JSONAPISerializer.extend({

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let modifiedPayload;

    if (Ember.isArray(payload)) {
      modifiedPayload = {data: payload.map(transform)};
    } else {
      modifiedPayload = {data: transform(payload)};
    }

    return this._super(store, primaryModelClass, modifiedPayload, id, requestType);
  },

});
