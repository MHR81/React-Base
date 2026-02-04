import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const pushManager = {
    // رجیستر SW
    init: async () => {
        if (!('serviceWorker' in navigator)) return;
        await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    },

    // گرفتن توکن (مثل API get)
    getToken: async () => {
        const registration = await navigator.serviceWorker.ready;
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration,
        });
        return token;
    },

    // درخواست اجازه
    requestPermission: () => Notification.requestPermission(),

    // لیسن کردن (مثل WebSocket on)
    onMessage: (callback) => onMessage(messaging, callback),
};

export default pushManager;