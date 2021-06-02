import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CreatePostScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Create Post Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#d3d3d3',
  },
});

export default CreatePostScreen;
