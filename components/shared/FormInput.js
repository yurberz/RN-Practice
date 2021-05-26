import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FormInput = ({iconType, labelValue, placeholderText, ...props}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <Ionicons name={iconType} size={25} color="#051d5f" />
      </View>
      <TextInput
        style={styles.input}
        value={labelValue}
        placeholder={placeholderText}
        placeholderTextColor="#808080"
        numberOfLines={1}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 4,
    backgroundColor: '#fffafa',
  },
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 50,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#d3d3d3',
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    fontFamily: 'RobotoMono-Regular',
    fontSize: 16,
    color: '#696969',
  },
});

export default FormInput;
