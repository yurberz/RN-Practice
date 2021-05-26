import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Auth from '../screens/auth/Auth';

const Routers = () => {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
};

export default Routers;
