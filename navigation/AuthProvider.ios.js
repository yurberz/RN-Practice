import React, {useState, createContext} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
