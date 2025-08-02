import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp, Client } from '@stomp/stompjs';

import toast from 'react-hot-toast';
import type { Mediciones } from '../interfaces/mediciones';
export function useMedicionesWS(
  dispositivoId: string,
  onMessage: (data: any) => void,
  onResetCache?: () => void // <-- NUEVO
) {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!dispositivoId) return;

    // Limpia el estado del cache anterior (opcional)
    onResetCache?.();

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    const socket = new SockJS(`${socketUrl}/canal-interno`);

    const client = new Client({
      webSocketFactory: () => socket as WebSocket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/canal-salida/mediciones/${dispositivoId}`, (message) => {
          const data = JSON.parse(message.body);
          onMessage(data);
        });
      },
      debug: (str) => {
        console.log('[STOMP DEBUG]', str);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [dispositivoId]);
}