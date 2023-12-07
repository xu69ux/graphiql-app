import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
export const auth = getAuth(app);
