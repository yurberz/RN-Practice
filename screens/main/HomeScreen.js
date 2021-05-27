import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {AuthContext} from '../../navigation/AuthProvider';
import FormButton from '../../components/shared/FormButton';

const HomeScreen = () => {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Home Screen, Welcome {user?.uid}</Text>
      <FormButton buttonTitle="Sign Out" onPress={() => logout()} />
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

export default HomeScreen;
