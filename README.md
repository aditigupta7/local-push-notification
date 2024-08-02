# LocalPushNotification

LocalPushNotification is a mobile application built using React Native. It includes native modules and has the functionality to give local notifications even when the app is killed.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Introduction

LocalPushNotification is designed to demonstrate the integration of native modules within a React Native project. The app includes a feature to send local notifications to the user, even when the app is not running.

## Features

- **React Native**: Built using the React Native framework for cross-platform mobile development.
- **Native Modules**: Utilizes native modules for enhanced functionality.
- **Local Notifications**: Sends local notifications to the user when the app is killed.

## Installation

To get started with MyReactNativeApp, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/aditigupta7/LocalPushNotification.git
   ```
2. Navigate to the project directory:
   ```bash
   cd local-push-notification
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
## Usage

To run the app on your device or emulator, use the following commands:

### Android

```bash
npx react-native run-android
or 
yarn android
```

### iOS

```bash
npx react-native run-ios
or yarn ios
```

## Configuration

### Local Notifications

To enable local notifications when the app is killed, follow these steps:

1. **Android**:
   - Ensure you have the required permissions in your `AndroidManifest.xml`:
     ```xml
   <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
     ```
   - Implement a NotificationReceiver to handle the notification logic.

2. **iOS**:
   - Request permission for notifications in your `AppDelegate.m`:
    
   - Implemented a native module for Notification functionality on ios using bridging and also allow to request users the  permission to give notification when app is killed.


