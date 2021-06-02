import React, {useState, createContext} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    email: email,
                    fname: '',
                    lname: '',
                    userImg: null,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                  })
                  .catch(err => {
                    console.log(
                      'Something went wrong with added user to firestore: ',
                      err,
                    );
                  });
              })
              .catch(err => {
                console.log('Something went wrong with sign up: ', err);
              });
          } catch (err) {
            console.log(err);
          }
        },
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (err) {
            console.log(err);
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
          } catch (err) {
            console.log(err);
          }
        },
        facebookLogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            // Sign-in the user with the credential
            await auth().signInWithCredential(facebookCredential);
          } catch (err) {
            console.log(err);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (err) {
            console.log(err);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
