import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const FormButton = ({buttonTitle, ...props}) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      activeOpacity={0.8}
      {...props}>
      <Text style={styles.btnText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
    height: 50,
    backgroundColor: '#2e64e5',
    borderRadius: 4,
  },
  btnText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 18,
    color: '#fffafa',
  },
});

export default FormButton;
