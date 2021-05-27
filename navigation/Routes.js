import React, {useState, useEffect, useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {AuthContext} from './AuthProvider';
import Auth from '../screens/auth/Auth';
import Main from '../screens/main/Main';

const Routes = () => {
  const [initializing, setInitializing] = useState(true);

  const {user, setUser} = useContext(AuthContext);

  const onAuthStateChanged = usr => {
    setUser(usr);

    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }
  return (
    <NavigationContainer>{user ? <Main /> : <Auth />}</NavigationContainer>
  );
};

export default Routes;
