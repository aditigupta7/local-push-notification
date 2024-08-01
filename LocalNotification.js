import { NativeModules } from 'react-native';
const { LocalNotification } = NativeModules;

const LocalNotificationModule = {
  showNotification(title, message) {
    LocalNotification.showNotification(title, message);
  }
};


export default LocalNotificationModule;
