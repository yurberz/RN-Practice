import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import * as Animatable from 'react-native-animatable';

import {Formik} from 'formik';
import {loginValidationSchema} from '../../utils/validation';

import {AuthContext} from '../../navigation/AuthProvider';
import FormInput from '../../components/shared/FormInput';
import FormButton from '../../components/shared/FormButton';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/4.png')}
      />

      <Text style={styles.text}>RN Practice App</Text>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => {
          const {email, password} = values;

          login(email, password);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <FormInput
              name="email"
              placeholder="email"
              iconType="person-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && (
              <Animatable.View
                animation="fadeInLeft"
                duration={250}
                easing="ease-in-out-cubic">
                <Text style={styles.errorMsg}>{errors.email}</Text>
              </Animatable.View>
            )}

            <FormInput
              name="password"
              placeholder="password"
              iconType="lock-closed-outline"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && (
              <Animatable.View
                animation="fadeInLeft"
                duration={250}
                easing="ease-in-out-cubic">
                <Text style={styles.errorMsg}>{errors.password}</Text>
              </Animatable.View>
            )}

            <FormButton
              onPress={handleSubmit}
              buttonTitle="Sign In"
              disabled={!isValid}
            />
          </>
        )}
      </Formik>

      <TouchableOpacity
        style={styles.navBtn}
        onPress={() => navigation.navigate('Reg')}
        activeOpacity={0.8}>
        <Text style={styles.navBtnText}>Don't have an account? Sign up</Text>
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
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
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
  errorMsg: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 11,
    color: '#FF0000',
  },
});

export default LoginScreen;
