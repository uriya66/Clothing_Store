// initializeApp - creates an app instance based on some type of config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  // methods that help to upload categories from shop-data.js file to collections up in firestore
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// config is an object that allows us to attach this firebase instance to that instance that we have online
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt5gDs1TC3lV7--2lRyY7iLD6sbx1cXZk",
  authDomain: "clothing-store-db-c037c.firebaseapp.com",
  projectId: "clothing-store-db-c037c",
  storageBucket: "clothing-store-db-c037c.appspot.com",
  messagingSenderId: "665865272016",
  appId: "1:665865272016:web:204320f2c9256301a7bcd5",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize a provider using Google class that we get from Firebase authentication
const googleProvider = new GoogleAuthProvider();
// Force the user to select an account
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// method that allows to upload categories from shop-data.js file to collections up in firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  // actual documents to add - object because they are JSON objects
  objectsToAdd
) => {
  const batch = writeBatch(db);
  // create a collection
  const collectionReference = collection(db, collectionKey);

  // create a banch of set events - for each of these objects create and set the object into collection
  objectsToAdd.forEach((object) => {
    const DocumentReference = doc(
      collectionReference,
      object.title.toLowerCase()
    );
    batch.set(DocumentReference, object);
  });

  await batch.commit();
  console.log("done");
};

// method that allows to get the category
export const getCategoriesAndDocuments = async () => {
  const collectionReference = collection(db, "categories");
  // generate query by passing in the collection reference
  const q = query(collectionReference);

  // getDocs asynchronous ability to fetch document snapshot
  // now all encapsulated under querySnapshot
  const querySnapshot = await getDocs(q);

  // gives an array of all individual documents inside and the snapshot is the data themselves - querySnapshot.docs

  // give back the categories as an array (using at Redux)
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const creatUserDocumentFromAuth = async (
  userAuth,
  // in case we not get displayName
  additionalInformation = {}
) => {
  if (!userAuth) return;
  // instance of a document model
  // using a unique "userAuth.uid" from db to get a document reference
  const userDocReference = doc(db, "users", userAuth.uid);
  // get and check data
  const userSnapshot = await getDoc(userDocReference);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      await setDoc(userDocReference, {
        displayName,
        email,
        createdDate,
        // spread the object after all the fields have been filled - then in case that doesn't have displayName we get it from the input
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocReference;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// observable listener is a way to hook into some kind of stream of events able to trigger something based on changes (sign in/sign out)
// whenever instantiate this function that gives me a callback
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
