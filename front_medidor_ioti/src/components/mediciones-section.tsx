import { useState, useEffect, useRef } from "react"

import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react"
import { Icon } from "@iconify/react/dist/iconify.js"

// api
import { useDispositivos } from "../hooks/useDispositivos";
import BarChartRealtime from "./graficos/LineChartRealtime";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { myConect, useRealtimeMediciones, useTestWs, useWebSocket } from "../hooks/useMedicionesWebSocket";

import { useMediciones, useMedicionesId } from "../hooks/useMediciones";


export default function MedicionesSection() {

    // Estado para el dispositivo seleccionado
    const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState<string>('');
    // Obtener la lista de dispositivos
    const { data: dataDispositivos } = useDispositivos();
    const dispositivos = dataDispositivos ?? [];
    // Mediciones por dispositivo seleccionado
    /* const { data: dataMedicionID, refetch: recargarMedicionID } = useMedicionesId(dispositivoSeleccionado);
     const MedicionIdDispositivo = dataMedicionID ?? [];
     // Establecer primer dispositivo si no hay uno seleccionado
     useEffect(() => {
         if (dispositivos.length > 0 && !dispositivoSeleccionado) {
             const primerDispositivo = dispositivos[0];
             if (primerDispositivo?.id) {
                 setDispositivoSeleccionado(primerDispositivo.id);
             }
         }
     }, [dispositivos]);
     // Refetch mediciones cuando cambia el dispositivo
     useEffect(() => {
         if (dispositivoSeleccionado) {
             recargarMedicionID();
         }
     }, [dispositivoSeleccionado]);
     const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
         setDispositivoSeleccionado(e.target.value);
     };*/

    // Socket
    // const medicionesTiempoReal = useRealtimeMediciones(dispositivoSeleccionado);
    // useTestWs();
    //  useWebSocket();
    const client = useRef<Client | null>(null);

    useEffect(() => {
        const socket = new SockJS("http://localhost:3050/canal-interno");

        client.current = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log("WS: ", str),
            onConnect: () => {
                console.log("✅ Conectado al WebSocket", socket);
                client.current?.subscribe(`/topic/saludos`, (message) => {
                    const data = JSON.parse(message.body);
                    console.log("🔔 Notificación:", data);
                    // toast("🔔 Notificación: Su CV fue revisado por nuestro agente");
                    // Opcional: Si recibes una actualización de una postulación, puedes actualizarla en el estado 'postulaciones'
                    // setPostulaciones(prev => prev.map(p => p.id === data.id ? data : p));
                    // O, para mayor simplicidad, recargar todas las postulaciones:

                });
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
    }, []);

    /*
    const client = useRef<Client | null>(null);
    useEffect(() => {
        client.current = new Client({
            // ✅ WebSocket puro
            brokerURL: "ws://localhost:3050/canal-interno",

            // ✅ Activar reconexión automática
            reconnectDelay: 5000,

            // ✅ Mostrar logs si quieres depurar
            debug: (str) => console.log("WS: ", str),

            onConnect: () => {
                console.log("✅ Conectado al WebSocket");

                // Suscribirse al canal
                client.current?.subscribe("/topic/saludos", (message) => {
                    const data = JSON.parse(message.body);
                    console.log("🔔 Notificación:", data);
                    // Aquí puedes manejar el mensaje recibido
                });
            },

            onStompError: (frame) => {
                console.error("❌ Error STOMP:", frame);
            },

            onWebSocketError: (event) => {
                console.error("❌ Error WebSocket:", event);
            },
        });

        client.current.activate();

        // 🔃 Cleanup al desmontar
        return () => {
            client.current?.deactivate();
        };
    }, []);
    */

    // console.log("acumulacion - de medida por id:  ", medicionesTiempoReal);



    //todas las mediciones Diarias --- por paginacion
    const { data: MedicionesDiarias, refetch, isLoading } = useMediciones();
    const mediciones = MedicionesDiarias?.items ?? [];
    const total = MedicionesDiarias?.totalItems;
    const MedicionesActual = MedicionesDiarias?.page;


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Mediciones en Tiempo Real</h2>
                    <p className="text-gray-600">Monitorea el estado actual de tus dispositivos</p>
                </div>
                <div className="flex flex-col w-72">
                    <Typography
                        variant="paragraph"
                        {...({} as React.ComponentProps<typeof Typography>)}
                    >
                        Dispositivo Seleccionado:
                    </Typography>
                    {/*<div className="relative">
                        <select
                            id="filtro-dispositivo"
                            name="filtro-dispositivo"
                            value={dispositivoSeleccionado}
                           // onChange={handleChange}
                            className="block w-full appearance-none px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >

                            {dispositivos.map((dispositivo) => (
                                <option key={dispositivo.id} value={dispositivo.id}>
                                    {dispositivo.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>*/}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-green-200 bg-green-50" {...({} as React.ComponentProps<typeof Card>)}>
                    <CardBody className="p-4" {...({} as React.ComponentProps<typeof CardBody>)}>
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <div>
                                <p className="text-sm font-medium text-green-800">Sistema Activo</p>
                                <p className="text-xs text-green-600">Recibiendo datos en tiempo real</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            {/* Real-time Chart 
            <Card className="border-cyan-100 p-5" {...({} as React.ComponentProps<typeof Card>)}>
                <div>
                    <Typography variant="h4" className="flex items-center space-x-2" {...({} as React.ComponentProps<typeof Typography>)}>
                        <Icon icon="lucide:activity" className="w-10 h-10 text-cyan-500" />
                        <span>Niveles en Tiempo Real: {dispositivoSeleccionado}</span>
                    </Typography>
                </div>
                <CardBody {...({} as React.ComponentProps<typeof CardBody>)}>
                    <div>
                        {MedicionIdDispositivo.length === 0 ? (
                            <Typography variant="h5" className="h-85 font-medium" {...({} as React.ComponentProps<typeof Typography>)}>
                                Dispositivo sin registros ...
                            </Typography>
                        ) : (
                            <BarChartRealtime data={MedicionIdDispositivo} />

                        )}

                    </div>
                </CardBody>
            </Card>
            {/* Measurements Table */}
            <Card className="border-cyan-100 p-5" {...({} as React.ComponentProps<typeof Card>)}>
                <div>
                    <Typography className="flex items-center space-x-2" {...({} as React.ComponentProps<typeof Typography>)}>
                        <Icon icon="game-icons:droplets" className="w-10 h-10 text-cyan-500" />
                        <span>Mediciones Recientes</span>
                    </Typography>
                </div>
                {/* Poner una paginacion o solo medir la cantidad */}
                <CardBody {...({} as React.ComponentProps<typeof CardBody>)}>
                    <div className="overflow-x-auto rounded-2xl shadow-md">
                        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">
                                        Dispositivo ID
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">
                                        Fecha y Hora
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">
                                        Distancia (cm)
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">
                                        Volumen (L)
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">
                                        Nivel
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {mediciones.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="even:bg-gray-50 hover:bg-blue-50 transition-colors"
                                    >
                                        <td className="px-6 py-3 font-medium text-gray-800">
                                            {item.dispositivoId}
                                        </td>
                                        <td className="px-6 py-3 text-gray-600">
                                            {new Date(item.fechaHora).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-3 text-gray-600">{item.distancia} cm</td>
                                        <td className="px-6 py-3 text-gray-600">{item.volumen} L</td>
                                        <td className="px-6 py-3">
                                            <span
                                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full
                                                        ${item.nivel === 'ALTO'
                                                        ? 'bg-green-100 text-green-800'
                                                        : item.nivel === 'MEDIO'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {item.nivel}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p>Página actual: {MedicionesActual}</p>
                        <p>Total de elementos: {total}</p>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}