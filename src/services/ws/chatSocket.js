import socketManager from "./base/base-socket";

const WS_URL = import.meta.env.VITE_WS_URL;

const chatSocket = {
    connect: () => socketManager.connect(WS_URL),

    // ارسال پیام
    sendMessage: (message) => socketManager.emit('send-message', message),

    // تایپ کردن
    typing: (isTyping) => socketManager.emit('typing', { isTyping }),

    // لیسن کردن
    onMessage: (callback) => socketManager.on('new-message', callback),
    onTyping: (callback) => socketManager.on('user-typing', callback),

    disconnect: () => socketManager.disconnect(),
};

export default chatSocket;