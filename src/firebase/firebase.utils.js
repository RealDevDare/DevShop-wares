import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBAJ0huZDTYTEaDvKEhlWrGA7m3t81Anxw",
  authDomain: "use-firebase-43193.firebaseapp.com",
  databaseURL: "https://use-firebase-43193.firebaseio.com",
  projectId: "use-firebase-43193",
  storageBucket: "use-firebase-43193.appspot.com",
  messagingSenderId: "756175991561",
  appId: "1:756175991561:web:e200230c7859789426d9d8",
  measurementId: "G-XLTW72L4LQ"
};

export const createUserProfileDocument = 
  async (userAuth, additionalData) => 
{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  
  if(!snapShot.exists){
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error){
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  'prompt' : 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;