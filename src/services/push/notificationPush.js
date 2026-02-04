import pushManager from "./base/base-push";
import requests from "../api/base/base-api";


const notificationPush = {
    // شروع کامل
    init: async () => {
        await pushManager.init();

        const permission = await pushManager.requestPermission();
        if (permission !== 'granted') return null;

        const token = await pushManager.getToken();
        if (!token) return null;


        // ذخیره در سرور (مثل API post)
        const body = {
            push_token: token,
            device_id: navigator.userAgent.replace(/\D/g, '').slice(0, 10) || 'web-' + Date.now()
        }
        await requests.post('/fcm/v1/save-push-token-user', body);

        return token;
    },

    // لیسن کردن (مثل chatSocket.onMessage)
    onMessage: (callback) => pushManager.onMessage(callback),
};

export default notificationPush;