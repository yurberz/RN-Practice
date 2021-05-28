import React, {useState, useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnBoardingScreen from './OnBoardingScreen';
import LoginScreen from './LoginScreen';
import RegScreen from './RegScreen';

const AuthStack = createStackNavigator();

const Auth = () => {
  const [isFirst, setIsFirst] = useState(null);

  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('already').then(value => {
      if (value === null) {
        AsyncStorage.setItem('already', 'true');
        setIsFirst(true);
      } else {
        setIsFirst(false);
      }
    });
  }, []);

  if (isFirst === null) {
    return null;
  } else if (isFirst === true) {
    routeName = 'OnBoarding';
  } else {
    routeName = 'Login';
  }

  return (
    <AuthStack.Navigator initialRouteName={routeName} headerMode="none">
      <AuthStack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Reg" component={RegScreen} />
    </AuthStack.Navigator>
  );
};

export default Auth;
