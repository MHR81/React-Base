import webrtc from './base/base-webrtc';
import callSocket from '../ws/callSocket';


const callService = {
  // شروع تماس (تماس گیرنده)
  startCall: async (roomId, remoteUserId, { video = true, audio = true } = {}) => {
    callSocket.connect(roomId);

    // گرفتن استریم
    const localStream = await webrtc.getLocalStream(video, audio);

    // ساختن connection
    webrtc.createPeerConnection();

    // ارسال ICE candidates
    webrtc.onIceCandidate((candidate) => {
      callSocket.sendIce(candidate, remoteUserId);
    });

    // ساختن و ارسال offer
    const offer = await webrtc.createOffer();
    callSocket.sendOffer(offer, remoteUserId);

    // منتظر answer
    return new Promise((resolve, reject) => {
      const unsubAnswer = callSocket.onAnswer(async ({ answer, from }) => {
        if (from === remoteUserId) {
          await webrtc.setRemoteDescription(answer);
          resolve({
            localStream,
            remoteStream: webrtc.remoteStream,
            close: () => callService.endCall(),
          });
        }
      });

      const unsubReject = callSocket.onReject(({ from }) => {
        if (from === remoteUserId) {
          webrtc.close();
          reject(new Error('Call rejected'));
        }
      });

      // دریافت ICE طرف مقابل
      callSocket.onIce(async ({ candidate, from }) => {
        if (from === remoteUserId) {
          await webrtc.addIceCandidate(candidate);
        }
      });
    });
  },

  // پاسخ به تماس (تماس گیرنده)
  answerCall: async (roomId, remoteUserId, { video = true, audio = true } = {}) => {
    callSocket.connect(roomId);

    const localStream = await webrtc.getLocalStream(video, audio);
    webrtc.createPeerConnection();

    webrtc.onIceCandidate((candidate) => {
      callSocket.sendIce(candidate, remoteUserId);
    });

    return new Promise((resolve) => {
      callSocket.onOffer(async ({ offer, from }) => {
        if (from !== remoteUserId) return;

        await webrtc.setRemoteDescription(offer);
        const answer = await webrtc.createAnswer();
        callSocket.sendAnswer(answer, remoteUserId);

        resolve({
          localStream,
          remoteStream: webrtc.remoteStream,
          close: () => callService.endCall(),
        });
      });

      callSocket.onIce(async ({ candidate, from }) => {
        if (from === remoteUserId) {
          await webrtc.addIceCandidate(candidate);
        }
      });
    });
  },

  // رد تماس
  rejectCall: (remoteUserId) => {
    callSocket.sendReject(remoteUserId);
    callSocket.disconnect();
  },

  // پایان تماس
  endCall: () => {
    webrtc.close();
    callSocket.disconnect();
  },

  // کنترل‌ها
  toggleAudio: (enabled) => webrtc.toggleAudio(enabled),
  toggleVideo: (enabled) => webrtc.toggleVideo(enabled),

  // گوش دادن به رویدادها
  onIncomingCall: (cb) => callSocket.onOffer(cb),
  onCallRejected: (cb) => callSocket.onReject(cb),
  onCallEnded: (cb) => callSocket.onEnd(cb),
};

export default callService;