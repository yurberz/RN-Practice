import React from 'react';
import {} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import DefaultProfileScreen from './nestedScreens/DefaultProfileScreen';
import EditProfileScreen from './nestedScreens/EditProfileScreen';

const ProfileStack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="DefaultProfile"
        component={DefaultProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: '#d3d3d3',
            shadowColor: '#a9a9a9',
          },
          headerTitle: 'Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'RobotoMono-Bold',
            fontSize: 20,
            color: '#242a37',
          },
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: '#d3d3d3',
            shadowColor: '#a9a9a9',
          },
          headerBackTitleVisible: false,
          headerTitle: 'Edit Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'RobotoMono-Bold',
            fontSize: 20,
            color: '#242a37',
          },
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileScreen;
