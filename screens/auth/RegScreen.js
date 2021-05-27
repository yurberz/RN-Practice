// import React, {useState, useContext} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

// import * as Animatable from 'react-native-animatable';

// import {AuthContext} from '../../navigation/AuthProvider';
// import FormInput from '../../components/shared/FormInput';
// import FormButton from '../../components/shared/FormButton';

// const RegScreen = ({navigation}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isValidPassword, setIsValidPassword] = useState(true);

//   const {register} = useContext(AuthContext);

//   const handlePasswordChange = value => {
//     setPassword(value);

//     if (value.trim().length < 6 && value.trim().length >= 1) {
//       setIsValidPassword(false);
//     } else {
//       setIsValidPassword(true);
//     }
//   };

//   const handleConfirmPasswordChange = value => {
//     setConfirmPassword(value);

//     if (password !== confirmPassword) {
//       setIsValidPassword(false);
//       return;
//     } else {
//       setIsValidPassword(true);
//     }
//   };

//   const regHandle = () => {
//     if (
//       email.length === 0 ||
//       password.length === 0 ||
//       confirmPassword.length === 0
//     ) {
//       Alert.alert(
//         'Wrong Input!',
//         'email, password or confirm password field cannot be empty.',
//         [{text: 'Okay'}],
//       );
//       return;
//     }

//     register(email, password);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Create an account</Text>
//       <FormInput
//         labelValue={email}
//         onChangeText={value => setEmail(value)}
//         placeholderText="email"
//         iconType="person-outline"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         autoCorrect={false}
//       />

//       <FormInput
//         labelValue={password}
//         onChangeText={value => handlePasswordChange(value)}
//         placeholderText="password"
//         iconType="lock-closed-outline"
//         secureTextEntry={true}
//         textContentType="oneTimeCode"
//       />

//       {isValidPassword ? null : (
//         <Animatable.View
//           animation="fadeInLeft"
//           duration={250}
//           easing="ease-in-out-cubic">
//           <Text style={styles.errorMsg}>
//             Password must be 6 characters long.
//           </Text>
//         </Animatable.View>
//       )}

//       <FormInput
//         labelValue={confirmPassword}
//         onChangeText={value => handleConfirmPasswordChange(value)}
//         placeholderText="confirm password"
//         iconType="lock-closed-outline"
//         secureTextEntry={true}
//         textContentType="oneTimeCode"
//       />

//       {isValidPassword ? null : (
//         <Animatable.View
//           animation="fadeInLeft"
//           duration={250}
//           easing="ease-in-out-cubic">
//           <Text style={styles.errorMsg}>Password mismatch.</Text>
//         </Animatable.View>
//       )}

//       <FormButton buttonTitle="Sign Up" onPress={regHandle} />

//       <TouchableOpacity
//         style={styles.navBtn}
//         onPress={() => navigation.navigate('Login')}
//         activeOpacity={0.8}>
//         <Text style={styles.navBtnText}>Have an account? Sign in</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#d3d3d3',
//   },
//   text: {
//     fontFamily: 'RobotoMono-Bold',
//     fontSize: 28,
//     marginTop: 30,
//     marginBottom: 10,
//     color: '#051d5f',
//   },
//   navBtn: {
//     marginVertical: 35,
//   },
//   navBtnText: {
//     fontFamily: 'RobotoMono-Medium',
//     fontSize: 11,
//     color: '#2e64e5',
//   },
//   errorMsg: {
//     fontFamily: 'RobotoMono-Regular',
//     fontSize: 11,
//     color: '#FF0000',
//   },
// });

// export default RegScreen;
import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import * as Animatable from 'react-native-animatable';

import {Formik} from 'formik';
import {regValidationSchema} from '../../utils/validation';

import {AuthContext} from '../../navigation/AuthProvider';
import FormInput from '../../components/shared/FormInput';
import FormButton from '../../components/shared/FormButton';

const RegScreen = ({navigation}) => {
  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      {/* <FormInput
        labelValue={email}
        onChangeText={value => setEmail(value)}
        placeholderText="email"
        iconType="person-outline"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={value => handlePasswordChange(value)}
        placeholderText="password"
        iconType="lock-closed-outline"
        secureTextEntry={true}
        textContentType="oneTimeCode"
      />

      {isValidPassword ? null : (
        <Animatable.View
          animation="fadeInLeft"
          duration={250}
          easing="ease-in-out-cubic">
          <Text style={styles.errorMsg}>
            Password must be 6 characters long.
          </Text>
        </Animatable.View>
      )}

      <FormInput
        labelValue={confirmPassword}
        onChangeText={value => handleConfirmPasswordChange(value)}
        placeholderText="confirm password"
        iconType="lock-closed-outline"
        secureTextEntry={true}
        textContentType="oneTimeCode"
      />

      {isValidPassword ? null : (
        <Animatable.View
          animation="fadeInLeft"
          duration={250}
          easing="ease-in-out-cubic">
          <Text style={styles.errorMsg}>Password mismatch.</Text>
        </Animatable.View>
      )}

      <FormButton buttonTitle="Sign Up" onPress={regHandle} /> */}
      <Formik
        validationSchema={regValidationSchema}
        initialValues={{email: '', password: '', confirmPassword: ''}}
        onSubmit={values => {
          const {email, password} = values;

          register(email, password);
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
              textContentType="oneTimeCode"
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
              textContentType="oneTimeCode"
            />
            {errors.password && (
              <Animatable.View
                animation="fadeInLeft"
                duration={250}
                easing="ease-in-out-cubic">
                <Text style={styles.errorMsg}>{errors.password}</Text>
              </Animatable.View>
            )}

            <FormInput
              name="comfirmPassword"
              placeholder="confirm password"
              iconType="lock-closed-outline"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
              textContentType="oneTimeCode"
            />
            {errors.confirmPassword && (
              <Animatable.View
                animation="fadeInLeft"
                duration={250}
                easing="ease-in-out-cubic">
                <Text style={styles.errorMsg}>{errors.confirmPassword}</Text>
              </Animatable.View>
            )}

            <FormButton
              onPress={handleSubmit}
              buttonTitle="Sign Up"
              disabled={!isValid}
            />
          </>
        )}
      </Formik>

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
  errorMsg: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 11,
    color: '#FF0000',
  },
});

export default RegScreen;
