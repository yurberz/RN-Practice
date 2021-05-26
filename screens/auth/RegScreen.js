import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import FormInput from '../../components/shared/FormInput';
import FormButton from '../../components/shared/FormButton';

const RegScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="email"
        iconType="person-outline"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="password"
        iconType="lock-closed-outline"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={userPassword => setConfirmPassword(userPassword)}
        placeholderText="confirm password"
        iconType="lock-closed-outline"
        secureTextEntry={true}
      />

      <FormButton buttonTitle="Sign Up" onPress={() => alert('Click!')} />

      <TouchableOpacity
        style={styles.navBtn}
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.8}>
        <Text style={styles.navBtnText}>Have an account? Sign in</Text>
      </TouchableOpacity>
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
  text: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 28,
    marginTop: 30,
    marginBottom: 10,
    color: '#051d5f',
  },
  navBtn: {
    marginVertical: 35,
  },
  navBtnText: {
    fontFamily: 'RobotoMono-Medium',
    fontSize: 11,
    color: '#2e64e5',
  },
});

export default RegScreen;
