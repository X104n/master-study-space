import firebase from 'firebase/app';
import 'firebase/database';
import {db} from '../config/firebaseConfig';
import {ref, get} from 'firebase/database';

// Ensure Firebase is initialized in another part of your application setup
// If not, initialize Firebase here with your config

const fetchRooms = async () => {
    const roomRef = ref(db, 'desks')
    try {
        const snapshot = await get(roomRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No room data available');
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch rooms:', error);
        return [];
    }
};

export default fetchRooms;
