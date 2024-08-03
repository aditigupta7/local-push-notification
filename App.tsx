import React, {useEffect, useState} from 'react';
import Navigation from './src/navigation/routes';
import SplashScreen from './src/screens/splash-screen';
import CurtainAnimation from './src/screens/curtain-animation';
import {AppState, AppStateStatus, NativeModules} from 'react-native';
import LocalNotificationNativeModule from './LocalNotification';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'curtain' | 'splash' | 'navigation'>(
    'curtain',
  );

  // storing current AppState
  const [appState, setAppState] = useState(AppState.currentState);

  // function to invole showNotification function 
  const handleShowNotification = () => {
    console.log('Calling showNotification');
    LocalNotificationNativeModule.showNotification(
      'App Termination',
      'Hey, the app is killed now. None of the JS will work.',
    );
  };

  useEffect(() => {
    // created an AppState function to call handleShowNotification in ios 
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App is in foreground!');
      } else if (nextAppState.match(/inactive|background/)) {
        handleShowNotification();
        console.log('App is in background or is inactive!');
      }
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);

    // return () => {
    //   AppState.removeEventListener('change', handleAppStateChange);
    // };
  }, []);

  useEffect(() => {
    // Start CurtainAnimation
    const timer1 = setTimeout(() => {
      setScreen('splash');
    }, 1000); // CurtainAnimation duration

    // Transition to SplashScreen after 2 seconds
    const timer2 = setTimeout(() => {
      setScreen('navigation');
    }, 2000); // Total duration before showing Navigation

    // Clean up timers if the component unmounts before the timers complete
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  switch (screen) {
    case 'curtain':
      return <CurtainAnimation />;
    case 'splash':
      return <SplashScreen />;
    case 'navigation':
      return <Navigation />;
    default:
      return null;
  }
};

export default App;
