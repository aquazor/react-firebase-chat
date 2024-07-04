import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db, storage } from './firebase';
import {
  FirestoreError,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from 'firebase/storage';
import { FirebaseError } from 'firebase/app';
import { CreateUserParams, User } from './types';

export const uploadAvatar = async (file: File, uid: string) => {
  try {
    const storageRef = ref(
      storage,
      `images/${new Date().toISOString()}_${file.name}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    const avatarUrl = await new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log('Upload failed:', error);
          reject(`Something went wrong. Error code: ${error.code}`);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.log(error);
            let message = 'Something went wrong.';

            if (error instanceof StorageError) {
              message += `Error code: ${error.code}`;
            }

            reject(message);
          }
        },
      );
    });

    await setDoc(doc(db, 'users', uid), { avatar: avatarUrl }, { merge: true });

    return avatarUrl;
  } catch (error) {
    console.log(error);
    let message = 'Something went wrong.';

    if (error instanceof StorageError) {
      message += `Error code: ${error.code}`;
    }

    throw Error(message);
  }
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
    throw Error('Something went wrong.');
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

export const searchUser = async (userName: string) => {
  try {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('username', '==', userName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((user) => user.data()) as User[];
    }

    return [];
  } catch (error) {
    console.log(error);

    if (error instanceof FirebaseError) {
      throw Error(error.message);
    }

    throw error;
  }
};

export const addChat = async (currentUser: User, addedUser: User) => {
  try {
    const chatRef = collection(db, 'chats');
    const userChatsRef = collection(db, 'userchats');

    const newChatRef = doc(chatRef);

    await setDoc(newChatRef, {
      createdAt: serverTimestamp(),
      messages: [],
    });

    await updateDoc(doc(userChatsRef, addedUser.id), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: '',
        receiverId: currentUser.id,
        updatedAt: Date.now(),
      }),
    });

    await updateDoc(doc(userChatsRef, currentUser.id), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: '',
        receiverId: addedUser.id,
        updatedAt: Date.now(),
      }),
    });
  } catch (error) {
    console.log(error);

    if (error instanceof FirebaseError) {
      throw Error(error.message);
    }

    throw error;
  }
};
