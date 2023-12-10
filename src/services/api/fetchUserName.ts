import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { User } from 'firebase/auth';

export const fetchUserName = async (
  user: User | null | undefined,
): Promise<string> => {
  try {
    const queryData = query(
      collection(db, 'users'),
      where('uid', '==', user?.uid),
    );
    const doc = await getDocs(queryData);
    const data = doc.docs[0].data();
    return data.name;
  } catch (err) {
    console.error(err);
    throw new Error('An error occurred while fetching user data');
  }
};
