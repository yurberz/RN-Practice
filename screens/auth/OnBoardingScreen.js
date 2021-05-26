import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({...props}) => (
  <TouchableOpacity style={styles.btn} activeOpacity={0.8} {...props}>
    <Text style={styles.text}>skip</Text>
  </TouchableOpacity>
);
const Next = ({...props}) => (
  <TouchableOpacity style={styles.btn} activeOpacity={0.8} {...props}>
    <Text style={styles.text}>next</Text>
  </TouchableOpacity>
);
const Done = ({...props}) => (
  <TouchableOpacity style={styles.btn} activeOpacity={0.8} {...props}>
    <Text style={styles.text}>done</Text>
  </TouchableOpacity>
);
const Dots = ({selected}) => {
  let backgroundColor;
  let width;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  width = selected ? 10 : 5;

  return <View style={{...styles.dotContainer, width, backgroundColor}} />;
};

const OnBoardingScreen = ({navigation}) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      titleStyles={styles.onboardTitle}
      subTitleStyles={styles.onboardSubTitle}
      pages={[
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              style={styles.img}
              source={require('../../assets/images/1.png')}
            />
          ),
          title: 'TRY',
          subtitle: 'Just do it...',
        },
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image
              style={styles.img}
              source={require('../../assets/images/2.png')}
            />
          ),
          title: 'YOU WILL LOVE IT',
          subtitle: '(^-^)',
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              style={styles.img}
              source={require('../../assets/images/3.png')}
            />
          ),
          title: 'DONE!',
          subtitle: '-;..;-',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  onboardTitle: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 32,
    color: '#242a37',
  },
  onboardSubTitle: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 17,
    color: '#242a37',
  },
  dotContainer: {
    marginHorizontal: 3,
    height: 5,
  },
  btn: {
    marginHorizontal: 10,
  },
  text: {
    fontFamily: 'RobotoMono-Medium',
    fontSize: 15,
    color: '#242a37',
  },
  img: {
    width: 150,
    height: 150,
  },
});

export default OnBoardingScreen;
