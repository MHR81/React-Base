import socketManager from './base/base-socket'

const WS_URL = import.meta.env.VITE_WS_URL;

const callSocket = {
    connect: (roomId) => socketManager.connect(`${WS_URL}/call/${roomId}`),

    // ارسال signaling
    sendOffer: (offer, toUserId) => socketManager.emit('call-offer', { offer, toUserId }),
    sendAnswer: (answer, toUserId) => socketManager.emit('call-answer', { answer, toUserId }),
    sendIce: (candidate, toUserId) => socketManager.emit('call-ice', { candidate, toUserId }),
    sendReject: (toUserId) => socketManager.emit('call-reject', { toUserId }),
    sendEnd: (toUserId) => socketManager.emit('call-end', { toUserId }),

    // دریافت signaling
    onOffer: (cb) => socketManager.on('call-offer', cb),
    onAnswer: (cb) => socketManager.on('call-answer', cb),
    onIce: (cb) => socketManager.on('call-ice', cb),
    onReject: (cb) => socketManager.on('call-reject', cb),
    onEnd: (cb) => socketManager.on('call-end', cb),
    onUserJoined: (cb) => socketManager.on('user-joined', cb),

    disconnect: () => socketManager.disconnect(),
};

export default callSocket;