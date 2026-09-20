import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export function useProjectSocket(projectId, onTaskUpdate) {
    const clientRef = useRef(null);

    useEffect(() => {
        if (!projectId) return;

        const client = new Client({
            webSocketFactory: () => new SockJS(import.meta.env.VITE_API_URL + '/ws'),
            onConnect: () => {
                client.subscribe(`/topic/project/${projectId}/task`, (message) => {
                    const data = JSON.parse(message.body);
                    onTaskUpdate(data);
                });
            },
            onDisconnect: () => {
            },
        });

        client.activate();
        clientRef.current = client;
        return () => {
            client.deactivate();
        };
    }, [projectId]);
}