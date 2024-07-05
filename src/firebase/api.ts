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
import { CreateUserParams, User, UserChat } from './types';

export async function setUserDocuments(user: User) {
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
}

export async function loginUser({ email, password }: CreateUserParams) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (err) {
    console.log(err);

    const error = err as AuthError;
    let errorMessage = 'Something went wrong.';

    if (error?.code === AuthErrorCodes.EMAIL_EXISTS) {
      errorMessage = 'User with this email already exists.';
    }

    if (error?.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
      errorMessage = 'Wrong email or password.';
    }

    throw Error(errorMessage);
  }
}

export async function registerUser({ email, password }: CreateUserParams) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return user;
  } catch (err) {
    console.log(err);

    const error = err as AuthError;
    let errorMessage = 'Something went wrong.';

    if (error?.code === AuthErrorCodes.EMAIL_EXISTS) {
      errorMessage = 'User with this email already exists.';
    }

    throw Error(errorMessage);
  }
}

export async function uploadAvatar(file: File, uid: string) {
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
}

export async function getDocument(collectionName: string, uid: string) {
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
}

export async function searchUser(userName: string) {
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
}

export async function addChat(currentUser: User, addedUser: User) {
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
}

export async function sendMessage(
  chatId: string,
  senderId: string,
  receiverId: string,
  text: string,
) {
  try {
    await updateDoc(doc(db, 'chats', chatId), {
      messages: arrayUnion({ senderId, text, createdAt: new Date() }),
    });

    const userIds = [senderId, receiverId];

    userIds.forEach(async (id) => {
      const userChatsRef = doc(db, 'userchats', id);
      const userChatsSnapshot = await getDoc(userChatsRef);

      if (userChatsSnapshot.exists()) {
        const chats = userChatsSnapshot.data().chats as UserChat[];

        const chatIndex = chats?.findIndex(
          (chat: UserChat) => chat.chatId === chatId,
        );

        chats[chatIndex].lastMessage = text;
        chats[chatIndex].isSeen = id === senderId ? true : false;
        chats[chatIndex].updatedAt = Date.now();

        await updateDoc(userChatsRef, { chats });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
