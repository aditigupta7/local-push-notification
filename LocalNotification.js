import {NativeModules, Platform} from 'react-native';
const {LocalNotification} = NativeModules; // for android

const {LocalNotificationModule} = NativeModules; // for ios

const LocalNotificationNativeModule = {
  showNotification(title, message) {
    if (Platform.OS === 'android') {
    //  LocalNotification.showNotification(title, message);
    } else {
      // Request permissions for push notification 
      LocalNotificationModule.requestAuthorization()
        .then(granted => {
          if (granted) {
            console.log('Notification permissions granted.');
          } else {
            console.log('Notification permissions denied.');
          }
        })
        .catch(error => {
          console.error('Authorization error:', error);
        });

        // Calling scheduleNotification method to initiate push notification
      LocalNotificationModule.scheduleNotification(title, message);
    }
  },
};

export default LocalNotificationNativeModule;
