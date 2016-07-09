import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  createRecord(store, type, snapshot) {
    const host = this.host;
    const owner = snapshot.attr('owner');
    const repo = snapshot.attr('repo');
    const issue = snapshot.attr('issue');
    const body = snapshot.attr('body');
    const url = `${host}/repos/${owner}/${repo}/issues/${issue}/comments`;

    return this.ajax(url, "POST", {data: {body}});
  }

});
