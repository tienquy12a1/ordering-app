import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: 'AIzaSyDIHBB0VBt5fBBB1sbhYXxiS4X8wDYsVh4',
        authDomain: 'ordering-app-37c88.firebaseapp.com',
        projectId: 'ordering-app-37c88',
        storageBucket: 'ordering-app-37c88.appspot.com',
        messagingSenderId: '884630844419',
        appId: '1:884630844419:web:2601ee079352ff714a8a36',
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await localforage.getItem('fcm_token');

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey:
              'BBNQ7LOphOjuUAfM7UZyUV_PxTQs8Wa94sRVNuK8W-W643vts5KF8bMKJUkbGArAcIauZ-lKPYPv-OEbrKSFTVg',
          });

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem('fcm_token', fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
