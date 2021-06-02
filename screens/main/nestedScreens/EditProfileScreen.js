import React, {useState, useEffect, useContext, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated /*,{useAnimatedStyle}*/ from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../navigation/AuthProvider';

import FormButton from '../../../components/shared/FormButton';

const EditProfileScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);

  const {user} = useContext(AuthContext);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl === null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        userImg: imgUrl,
        fname: userData.fname,
        lname: userData.lname,
        phone: userData.phone,
        country: userData.country,
        city: userData.city,
        about: userData.about,
      })
      .then(() => {
        console.log('User Updated!');
      });

    navigation.navigate('DefaultProfile');
  };

  const uploadImage = async () => {
    if (image === null) {
      return null;
    }

    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setImage(null);

      return url;
    } catch (err) {
      console.log(err);

      return null;
    }
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(img => {
        console.log(img);
        const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
        setImage(imageUri);
        bs.current.snapTo(1);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(img => {
        console.log(img);
        const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
        setImage(imageUri);
        bs.current.snapTo(1);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  const bs = createRef();
  const fall = new Animated.Value(1);

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
  //     margin: 20,
  //   };
  // });

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderInner = () => (
    <View style={styles.panel}>
      <View>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>

      <FormButton buttonTitle="Take Photo" onPress={takePhotoFromCamera} />
      <FormButton
        buttonTitle="Choose From Library"
        onPress={choosePhotoFromLibrary}
      />
      <FormButton buttonTitle="Cancel" onPress={() => bs.current.snapTo(1)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.animatedView,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View style={styles.personContainer}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View style={styles.iconContainer}>
              <ImageBackground
                style={styles.imgBg}
                imageStyle={styles.imageStyle}
                source={{
                  uri: image
                    ? image
                    : userData
                    ? userData.userImg ||
                      'https://image.flaticon.com/icons/png/512/848/848006.png'
                    : 'https://image.flaticon.com/icons/png/512/848/848006.png',
                }}>
                <View style={styles.cameraImgContainer}>
                  <Ionicons name="camera-outline" size={35} color="#fffafa" />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={styles.nameText}>
            {userData ? userData.fname : ''} {userData ? userData.lname : ''}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#242a37" />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#808080"
            onChangeText={value => setUserData({...userData, fname: value})}
            value={userData ? userData.fname : ''}
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#242a37" />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#808080"
            onChangeText={value => setUserData({...userData, lname: value})}
            value={userData ? userData.lname : ''}
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} color="#242a37" />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#808080"
            keyboardType="number-pad"
            onChangeText={value => setUserData({...userData, phone: value})}
            value={userData ? userData.phone : ''}
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="globe-outline" size={20} color="#242a37" />
          <TextInput
            style={styles.input}
            placeholder="Country"
            placeholderTextColor="#808080"
            onChangeText={value => setUserData({...userData, country: value})}
            value={userData ? userData.country : ''}
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color="#242a37" />
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#808080"
            onChangeText={value => setUserData({...userData, city: value})}
            value={userData ? userData.city : ''}
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="ios-clipboard-outline" size={20} color="#242a37" />
          <TextInput
            style={styles.input}
            placeholder="About Me"
            placeholderTextColor="#808080"
            onChangeText={value => setUserData({...userData, about: value})}
            value={userData ? userData.about : ''}
            autoCorrect={true}
            multiline
            numberOfLines={3}
          />
        </View>
        <View style={styles.btnContainer}>
          <FormButton buttonTitle="Update" onPress={handleUpdate} />
        </View>
      </Animated.View>
      <BottomSheet
        ref={bs}
        renderHeader={renderHeader}
        renderContent={renderInner}
        snapPoints={[330, -5]}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  animatedView: {
    margin: 20,
  },
  panel: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#a9a9a9',
  },
  header: {
    paddingTop: 15,
    backgroundColor: '#d3d3d3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowRadius: 2,
    shadowOffset: {width: -1, height: -3},
    shadowOpacity: 0.4,
    shadowColor: '#a9a9a9',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    marginBottom: 10,
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#808080',
  },
  panelTitle: {
    marginBottom: 5,
    fontFamily: 'RobotoMono-Bold',
    fontSize: 25,
    textAlign: 'center',
  },
  panelSubtitle: {
    marginBottom: 13,
    fontFamily: 'RobotoMono-Medium',
    fontSize: 15,
    color: '#808080',
    textAlign: 'center',
  },
  personContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  imgBg: {
    height: 100,
    width: 100,
  },
  imageStyle: {
    borderRadius: 15,
  },
  cameraImgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    marginTop: 10,
    fontFamily: 'RobotoMono-Bold',
    fontSize: 20,
    color: '#242a37',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#a9a9a9',
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    height: Platform.OS === 'ios' ? 25 : 40,
    fontFamily: 'RobotoMono-Regular',
    fontSize: 15,
    color: '#696969',
  },
  btnContainer: {
    alignItems: 'center',
  },
});

export default EditProfileScreen;
