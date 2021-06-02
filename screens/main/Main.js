import React from 'react';
import {} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import CreatePostScreen from './CreatePostScreen';
import ProfileScreen from './ProfileScreen';

const MainTab = createBottomTabNavigator();

const Main = () => {
  return (
    <MainTab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#2e64e5',
        inactiveTintColor: '#242a37',
        style: {
          backgroundColor: '#d3d3d3',
          borderTopWidth: 1,
          borderTopColor: '#a9a9a9',
        },
      }}>
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <MainTab.Screen
        name="Create Post"
        component={CreatePostScreen}
        options={() => ({
          tabBarIcon: ({color, size}) => (
            <Ionicons name="add-circle-outline" color={color} size={35} />
          ),
        })}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-circle-outline" color={color} size={30} />
          ),
        })}
      />
    </MainTab.Navigator>
  );
};

export default Main;
