import Ember from 'ember';
import DS from 'ember-data';

/**
 * Transform a given review-comment to the format ember-data expects.
 *
 * @param {object} obj An review-comment object.
 * @return {object}
 */
export function transform(obj) {
  return {
    id: obj.id,
    type: 'review-comment',
    attributes: {
      body: obj.body,
      created: obj.created_at,
      user: obj.user.login,
      avatar: obj.user.avatar_url,
      url: obj.html_url,
      diff: obj.diff_hunk,
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
