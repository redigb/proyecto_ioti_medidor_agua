import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp, Client } from '@stomp/stompjs';

import toast from 'react-hot-toast';
import type { Mediciones } from '../interfaces/mediciones';



export function useRealtimeMediciones(dispositivoId: string) {
  const [mediciones, setMediciones] = useState<Mediciones[]>([]);
  const stompClientRef = useRef<CompatClient | null>(null);
  const subscriptionRef = useRef<any>(null);
  const isFirstConnect = useRef(true);

  useEffect(() => {
    if (!dispositivoId) return;

    const socketUrl = import.meta.env.VITE_API_SOCKET_URL;
    const stompClient = Stomp.over(() => new SockJS(`${socketUrl}/canal-realtime`));
    stompClient.reconnectDelay = 5000;

    stompClient.connect({}, () => {
      if (isFirstConnect.current) {
        toast.success("🔌 Conexion webSocket activa");
        console.log("🔌 Conexion webSocket activa");
        isFirstConnect.current = false;
      }

      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      subscriptionRef.current = stompClient.subscribe(
        `/canal-interno/mediciones/${dispositivoId}`,
        (message) => {
          const nuevaMedicion: Mediciones = JSON.parse(message.body);
          setMediciones((prev) => [nuevaMedicion, ...prev].slice(0, 50));
        }
      );
    }, (error: any) => {
      toast.error("❌ Error de conexión STOMP");
      console.error("STOMP error:", error);
    });

    stompClient.debug = (str) => {
      console.log("[STOMP DEBUG]", str);
    };
    stompClient.onStompError = (frame) => {
      toast.error(`Error WS: ${frame.headers['message']}`);
    };

    stompClientRef.current = stompClient;

    return () => {
      if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect(() => {
          toast.error('🔌 Desconectado');
        });
      }
    };
  }, [dispositivoId]);

  return mediciones;
}


export function useTestWs() {

  useEffect(() => {
    // Si tu backend tiene SockJS habilitado
    const socket = new SockJS("http://localhost:8080/gs-guide-websocket");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame:any) => {
      console.log("🟢 Conectado: ", frame);

      // Suscribirse al topic
      stompClient.subscribe("/topic/greetings", (message) => {
        const data = JSON.parse(message.body);
        console.log("📩 Mensaje recibido: ", data.content);
      });

      // Enviar mensaje inmediatamente (como si fuera el click al botón)
      stompClient.send("/app/hello", {}, JSON.stringify({ name: "Renzo" }));
      console.log("📤 Mensaje enviado");
    },
      (error:any ) => {
        console.error("🔴 Error en conexión: ", error);
      });

    return () => {
      stompClient.disconnect(() => {
        console.log("🔌 Desconectado");
      });
    };
  }, []);

  return null;
}

export function myConect(){
  const client = useRef<Client | null>(null);
  // WebSocket (Tu código existente)
    useEffect(() => {
        const socket = new SockJS("http://localhost:3015/ws");

        client.current = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log("WS: ", str),
            onConnect: () => {
                console.log("✅ Conectado al WebSocket");
                /*client.current?.subscribe(`/topic/postulacion/${userId}`, (message) => {
                    const data = JSON.parse(message.body);
                    console.log("🔔 Notificación:", data);
                    toast("🔔 Notificación: Su CV fue revisado por nuestro agente");
                    // Opcional: Si recibes una actualización de una postulación, puedes actualizarla en el estado 'postulaciones'
                    // setPostulaciones(prev => prev.map(p => p.id === data.id ? data : p));
                    // O, para mayor simplicidad, recargar todas las postulaciones:
                   
                });*/
            },
            onStompError: (frame) => {
                console.error("❌ Error STOMP:", frame);
            },
        });

        client.current.activate();

        // 🔃 Cleanup al desmontar
        return () => {
            client.current?.deactivate();
        };
    }, []); // Agregamos userId como dependencia para reconectar si cambia
}


export function useWebSocket() {
  const clientRef = useRef<Client | null>(null);


  useEffect(() => {
    console.log('🔗 [useWebSocket] Activando el hook de WebSocket...');

    const websocketUrl = 'http://localhost:3050/ws';

    const client = new Client({
      webSocketFactory: () => new SockJS(websocketUrl),
      debug: (str) => console.log('[STOMP DEBUG]', str),
      reconnectDelay: 5000,

      onConnect: () => {
        console.log('🟢 [STOMP] Conexión STOMP establecida.');

        client.subscribe('/topic/mediciones', (message) => {
          console.log('📨 [STOMP] Mensaje recibido:', message.body);
        });

        const messageBody = 'Hola desde React usando STOMP 7';
        console.log(`⬆️ [STOMP] Publicando en /app/medir: "${messageBody}"`);
        client.publish({
          destination: '/app/medir',
          body: messageBody,
        });
      },

      onWebSocketError: (error) => {
        console.error('🔴 [WebSocket] Error de conexión del WebSocket:', error);
      },

      onWebSocketClose: (event) => {
        console.error('🔴 [WebSocket] Conexión WebSocket cerrada.', event);
      },

      onStompError: (frame) => {
        console.error('🔴 [STOMP] Error STOMP:', frame.headers['message']);
        console.error('Detalles:', frame.body);
      },
    });

    // Asigna el cliente a la referencia y ejecuta las peticiones de chequeo.
    clientRef.current = client;
    // checkEndpoints();

    return () => {
      console.log('🔴 [useWebSocket] Desactivando el hook de WebSocket...');
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);
}