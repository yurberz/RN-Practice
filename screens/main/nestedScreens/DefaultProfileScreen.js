import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../../../navigation/AuthProvider';

const DefaultProfileScreen = ({navigation, route}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {user, logout} = useContext(AuthContext);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();

    navigation.addListener('focus', () => setLoading(!loading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, loading]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.avatar}
          source={{
            uri: userData
              ? userData?.userImg ||
                'https://image.flaticon.com/icons/png/512/848/848006.png'
              : 'https://image.flaticon.com/icons/png/512/848/848006.png',
          }}
        />

        <Text style={styles.userName}>
          {userData ? userData?.fname : 'User Name'}{' '}
          {userData ? userData?.lname : null}
        </Text>

        <Text style={styles.aboutUser}>
          {userData ? userData?.about : 'No details added.'}
        </Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, styles.firstBtn]}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}
            activeOpacity={0.8}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => logout()}
            activeOpacity={0.8}>
            <Text style={styles.btnText}>SignOut</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    height: 120,
    width: 120,
    marginBottom: 10,
    borderRadius: 75,
  },
  userName: {
    marginBottom: 7,
    fontFamily: 'RobotoMono-Bold',
    fontSize: 20,
    color: '#242a37',
  },
  aboutUser: {
    marginBottom: 10,
    fontFamily: 'RobotoMono-Medium',
    fontSize: 12,
    color: '#a9a9a9',
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  btn: {
    minWidth: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#2e64e5',
  },
  firstBtn: {
    marginRight: 5,
  },
  btnText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 14,
    color: '#242a37',
  },
});

export default DefaultProfileScreen;
