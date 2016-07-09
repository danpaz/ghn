import Ember from 'ember';
import DS from 'ember-data';

/**
 * Transform a notification to the format ember-data expects.
 *
 * @param {object} obj A notification object.
 * @return {object}
 */
export function transform(obj) {
  const title = obj.subject.title;
  const type = obj.subject.type;
  const unread = obj.unread;
  const issue = obj.subject.url.split('/')[7];
  const repo = obj.repository.name;
  const owner = obj.repository.owner.login;
  const lastreadat = obj.last_read_at;

  // Issues that are PRs will get redirected to the right place.
  const url = `https://github.com/${owner}/${repo}/issues/${issue}`;

  let newObj = {
    id: obj.id,
    type: 'notification',
    attributes: {
      title,
      type,
      url,
      unread,
      issue,
      repo,
      owner,
      lastreadat
    },
    relationships: {
      'issue-comments': {
        links: {
          related: `/repos/${owner}/${repo}/issues/${issue}/comments#${Math.random()}`,
        }
      },
      'issue-events': {
        links: {
          related: `/repos/${owner}/${repo}/issues/${issue}/events#${Math.random()}`,
        }
      },
    }
  };

  // Only pull requests have review-comments.
  //
  if (type === 'PullRequest') {
    newObj.relationships['review-comments'] = {
      links: {
        related: `/repos/${owner}/${repo}/pulls/${issue}/comments#${Math.random()}`,
      }
    };
  }

  return newObj;
}

export default DS.JSONAPISerializer.extend({

  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    let modifiedPayload;

    if (Ember.isArray(payload)) {
      modifiedPayload = {data: payload.map(transform)};
    } else {
      modifiedPayload = {data: transform(payload)};
    }

    return this._super(store, primaryModelClass, modifiedPayload, id, requestType);
  },

});
