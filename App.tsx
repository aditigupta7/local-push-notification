import React, {useEffect, useState} from 'react';
import Navigation from './src/navigation/routes';
import SplashScreen from './src/screens/splash-screen';
import CurtainAnimation from './src/screens/curtain-animation';
import { AppState, AppStateStatus } from 'react-native';
import LocalNotification from './LocalNotification';



const App: React.FC = () => {
  const [screen, setScreen] = useState<'curtain' | 'splash' | 'navigation'>(
    'curtain',
  );

  const [appState, setAppState] = useState(AppState.currentState);

  const handleShowNotification = () => {
    console.log("Calling showNotification");
    LocalNotification.showNotification('App Termination', 'Hey, the app is killed now. None of the JS will work.');
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
      } else if (nextAppState.match(/inactive|background/)) {
        handleShowNotification()
        console.log('App has gone to the background or is inactive!');
        // Save data or perform cleanup here
      }
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);

    // return () => {
    //   AppState.removeEventListener('change', handleAppStateChange);
    // };
  }, [appState]);

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
