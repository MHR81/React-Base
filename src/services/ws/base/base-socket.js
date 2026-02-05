import { io } from 'socket.io-client';

class SocketManager {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
    }

    connect(url) {
        const token = localStorage.getItem('token'); // یا از جای دیگه بگیر

        this.socket = io(url, {
            auth: { token }, // ← ← ← مهمه
            transports: ['websocket'],
        });

        this.socket.on('connect', () => {
            console.log('✅ Socket.IO connected');
        });

        this.socket.on('disconnect', () => {
            console.log('❌ Socket.IO disconnected');
        });

        this.socket.on('error', (error) => {
            console.error('Socket.IO error:', error);
        });

        // Listen to events from server
        this.socket.onAny((event, data) => {
            if (this.listeners.has(event)) {
                this.listeners.get(event).forEach(cb => cb(data));
            }
        });

        return this.socket;
    }

    emit(event, data) {
        if (this.socket?.connected) {
            this.socket.emit(event, data);
        }
    }

    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);

        // Return unsubscribe
        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (this.listeners.has(event)) {
            const filtered = this.listeners.get(event).filter(cb => cb !== callback);
            this.listeners.set(event, filtered);
        }
    }

    disconnect() {
        this.socket?.disconnect();
    }
}

export default new SocketManager();