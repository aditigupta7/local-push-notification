import Foundation
import UserNotifications  // import user notification module

@objc(LocalNotificationModule)
class LocalNotificationModule: NSObject {
  
  // method to ask permissions from user to send notification
  @objc
  func requestAuthorization(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let center = UNUserNotificationCenter.current()
    center.requestAuthorization(options: [.alert, .sound, .badge]) { (granted, error) in
      if let error = error {
        reject("authorization_error", "Authorization failed", error)
      } else {
        resolve(granted)
      }
    }
  }

  // method to show notification when app is killed
  @objc
  func scheduleNotification(_ title: String, body: String) {
    let content = UNMutableNotificationContent()
    content.title = title // title
    content.body = body // body
    content.sound = UNNotificationSound.default  //default sound

    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)
    let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: trigger)
    
    let center = UNUserNotificationCenter.current()
    center.add(request) { (error) in
      if let error = error {
        // error block
        print("Error adding notification: \(error.localizedDescription)")
      }
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

