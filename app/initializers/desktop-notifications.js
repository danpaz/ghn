export function initialize(application) {
  if (!window.Notification) {
    return;
  }
  application.inject('route', 'desktop-notifications', 'service:desktop-notifications');
  application.inject('model', 'desktop-notifications', 'service:desktop-notifications');
  Notification.requestPermission();
}

export default {
  name: 'desktop-notifications',
  initialize
};
