class SocketManager {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
    }

    connect(url) {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('✅ WebSocket connected');
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // اگه eventType داشت، اون لیسنرها رو صدا بزن
            if (data.event && this.listeners.has(data.event)) {
                this.listeners.get(data.event).forEach(cb => cb(data.payload));
            }
        };

        this.socket.onclose = () => {
            console.log('❌ WebSocket disconnected');
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    // مثل requests.post
    emit(event, data) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ event, data }));
        }
    }

    // مثل useEffect برای یه event خاص
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);

        // برای unmount
        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (this.listeners.has(event)) {
            const filtered = this.listeners.get(event).filter(cb => cb !== callback);
            this.listeners.set(event, filtered);
        }
    }

    disconnect() {
        this.socket?.close();
    }
}

const socketManager = new SocketManager();
export default socketManager;