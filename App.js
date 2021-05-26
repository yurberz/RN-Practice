import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="person-outline" size={25} />
      <Text style={styles.text}>Hello Font M*F!!1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgrey',
  },
  text: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 22,
    color: '#fffd8f',
  },
});

export default App;
