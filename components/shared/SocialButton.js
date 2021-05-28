import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SocialButton = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{...styles.btnContainer, backgroundColor}}
      activeOpacity={0.8}
      {...props}>
      <View style={styles.btnTxtWrapper}>
        <Text style={{...styles.btnText, color}}>{buttonTitle}</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Ionicons name={btnType} size={22} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginBottom: 10,
    paddingHorizontal: 30,
    width: '65%',
    height: 50,
    flexDirection: 'row',
    borderRadius: 4,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 18,
  },
});

export default SocialButton;
