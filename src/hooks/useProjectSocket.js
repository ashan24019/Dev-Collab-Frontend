import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export function useProjectSocket(projectId, onTaskUpdate) {
    const clientRef = useRef(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (!projectId) return;

        const client = new Client({
            webSocketFactory: () => new SockJS(import.meta.env.VITE_API_URL + '/ws'),
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            debug: (str) => {
                console.log(str);
            },
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                setConnected(true);
                client.subscribe(`/topic/project/${projectId}/task`, (message) => {
                    const data = JSON.parse(message.body);
                    onTaskUpdate(data);
                });
            },
             onWebSocketClose: () => {
                console.log('WebSocket closed');
                setConnected(false);
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                setConnected(false);
            },
        });

        client.activate();
        clientRef.current = client;
        return () => {
            client.deactivate();
        };
    }, [projectId]);

    return connected ;
}