import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA138RVB1kGR1ebdTRMhrvME-XeAJuTFRM',
  authDomain: 'graphiql-ide-b7384.firebaseapp.com',
  projectId: 'graphiql-ide-b7384',
  storageBucket: 'graphiql-ide-b7384.appspot.com',
  messagingSenderId: '287649405573',
  appId: '1:287649405573:web:02628f9b154b8b84bb67ec',
  measurementId: 'G-FZ57QNT1PV',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return 'success';
  } catch (err) {
    console.error(err);
    return `${err}`;
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    return 'success';
  } catch (err) {
    console.error(err);
    return `${err}`;
  }
};

const logout = () => {
  signOut(auth);
  return 'success';
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
