class WebRTCManager {
    constructor() {
        this.pc = null;
        this.localStream = null;
        this.remoteStream = new MediaStream();
        this.config = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
            ]
        };
    }

    // گرفتن استریم محلی
    async getLocalStream(video = true, audio = true) {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({ video, audio });
            return this.localStream;
        } catch (err) {
            console.error('getUserMedia error:', err);
            throw err;
        }
    }

    // ساختن peer connection
    createPeerConnection() {
        this.pc = new RTCPeerConnection(this.config);

        // اضافه کردن ترک‌های محلی
        this.localStream?.getTracks().forEach(track => {
            this.pc.addTrack(track, this.localStream);
        });

        // دریافت ترک‌های ریموت
        this.pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach(track => {
                if (!this.remoteStream.getTracks().find(t => t.id === track.id)) {
                    this.remoteStream.addTrack(track);
                }
            });
        };

        return this.pc;
    }

    // ساختن offer
    async createOffer() {
        const offer = await this.pc.createOffer();
        await this.pc.setLocalDescription(offer);
        return offer;
    }

    // ساختن answer
    async createAnswer() {
        const answer = await this.pc.createAnswer();
        await this.pc.setLocalDescription(answer);
        return answer;
    }

    // ست کردن remote description
    async setRemoteDescription(desc) {
        await this.pc.setRemoteDescription(desc);
    }

    // اضافه کردن ICE candidate
    async addIceCandidate(candidate) {
        try {
            await this.pc.addIceCandidate(candidate);
        } catch (err) {
            console.error('addIceCandidate error:', err);
        }
    }

    // گوش دادن به ICE candidates
    onIceCandidate(callback) {
        this.pc.onicecandidate = (event) => {
            if (event.candidate) {
                callback(event.candidate);
            }
        };
    }

    // گوش دادن به تغییر وضعیت connection
    onConnectionStateChange(callback) {
        this.pc.onconnectionstatechange = () => {
            callback(this.pc.connectionState);
        };
    }

    // قطع تماس
    close() {
        this.localStream?.getTracks().forEach(track => track.stop());
        this.remoteStream?.getTracks().forEach(track => track.stop());
        this.pc?.close();
        this.pc = null;
        this.localStream = null;
        this.remoteStream = new MediaStream();
    }

    // قطع/وصل کردن صدا
    toggleAudio(enabled) {
        this.localStream?.getAudioTracks().forEach(track => {
            track.enabled = enabled;
        });
    }

    // قطع/وصل کردن ویدیو
    toggleVideo(enabled) {
        this.localStream?.getVideoTracks().forEach(track => {
            track.enabled = enabled;
        });
    }
}

export default new WebRTCManager();