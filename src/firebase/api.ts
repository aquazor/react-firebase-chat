import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db, storage } from './firebase';
import { FirestoreError, doc, getDoc, setDoc } from 'firebase/firestore';
import { CreateUserParams, User } from './types';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const uploadFile = async (file: File) => {
  const storageRef = ref(storage, `images/${new Date() + file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
        reject('Something went wrong. Try again later.' + error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      },
    );
  });
};

export const loginUser = async ({ email, password }: CreateUserParams) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    return response;
  } catch (err) {
    console.log(err);

    const error = err as AuthError;
    let errorMessage = 'Something went wrong.';

    if (error?.code === AuthErrorCodes.EMAIL_EXISTS) {
      errorMessage = 'User with this email already exists.';
    }

    throw Error(errorMessage);
  }
};

export const registerUser = async ({ email, password }: CreateUserParams) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return response;
  } catch (err) {
    console.log(err);

    const error = err as AuthError;
    let errorMessage = 'Something went wrong.';

    if (error?.code === AuthErrorCodes.EMAIL_EXISTS) {
      errorMessage = 'User with this email already exists.';
    }

    throw Error(errorMessage);
  }
};

export const setUserDocuments = async (user: User) => {
  const { id, username, email, blocked } = user;

  try {
    await setDoc(doc(db, 'users', id), {
      id,
      username,
      email,
      blocked,
    });
    await setDoc(doc(db, 'userchats', id), { chats: [] });
  } catch (error) {
    console.error(error);
    throw Error('Something went wrong. Try again later.');
  }
};

export const getDocument = async (collectionName: string, uid: string) => {
  try {
    const docRef = doc(db, collectionName, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as User;
    }

    return null;
  } catch (error) {
    console.log(error);

    if (error instanceof FirestoreError) {
      throw Error(error.message);
    }

    throw error;
  }
};
