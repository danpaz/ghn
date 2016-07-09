import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  /**
   * Modify modelName to use different url path for PATCH /notifications.
   */
  updateRecord(store, type, snapshot) {
    const data = {};
    const host = this.host;
    const url = `${host}/notifications/threads/${snapshot.id}`;
    const serializer = store.serializerFor(type.modelName);
    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

    // Github api returns empty body on success, which triggers an "Unexpected
    // end of input". Just return the data that ember-data expected.
    //
    return this.ajax(url, "PATCH", {data: data}).catch(() => {
      return data;
    });
  }

});
