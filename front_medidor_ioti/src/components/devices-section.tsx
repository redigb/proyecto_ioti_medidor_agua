import { useState } from "react"

import {
    Button, Card,
    Typography, Tooltip
} from "@material-tailwind/react"
import { Icon } from "@iconify/react/dist/iconify.js"
import toast from "react-hot-toast"
// api
import { useDispositivos } from '../hooks/useDispositivos';
import { crearDispositivo, actualizarDispositivo, eliminarDispositivo } from "../service/dispositivos"
import { isAxiosError } from "axios";
// mycomponents
import DialogDipositivo from "./dialog/DialogDispositivo"
// interface
import type { DispositivoCreate } from "../interfaces/dispositivos"
import { ConfirmDeleteDialog } from "./dialog/ConfirmDeleteDialog";

export interface DispositivoUpdate extends DispositivoCreate {
    id: string;
}

export default function DevicesSection() {
    const { data, isLoading, isError, refetch } = useDispositivos();
    const dispositivos = data ?? [];
    // Crear dispositivo
    const [open, setOpen] = useState(false);
    const handleOp = () => setOpen(!open);
    const [formDataDispositivo, setFormDataDispositivo] = useState<DispositivoCreate | null>({
        nombre: "",
        codigo: "",
        ubicacion: "",
        esp32Mac: "",
    });
    const handleSubmitDevice = async (data: DispositivoCreate) => {
        try {
            if ("id" in data) {
                await actualizarDispositivo(data.id!, {
                    nombre: data.nombre,
                    codigo: data.codigo,
                    ubicacion: data.ubicacion
                });
                toast.success(`Dispositivo actulizado: ${data.nombre}`, { duration: 2000 });
                refetch();
            } else {
                await crearDispositivo(data);
                toast.success(`Dispositivo creado: ${data.nombre}`, { duration: 2000 });
                refetch();
            }
        } catch (error) {
            //console.error("Error al registrar tienda:", error);
            let errorMessage = "No se pudo crear el dispositivo.";
            if (isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message;
            }
            toast.error(`Error: ${errorMessage}`);
        }
    }
    const onDeleteDispositivo = async (id: string) => {
        try {
            await eliminarDispositivo(id);
            toast.success("¡Tienda eliminada!", { duration: 2000 });
            refetch();
            // Si usas React Query, puedes hacer:
            // queryClient.invalidateQueries('tiendas');
        } catch (error) {
            let errorMessage = "No se pudo eliminar la tienda.";
            if (isAxiosError(error) && error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            toast.error(`Error: ${errorMessage}`);
        }
    }
    const handleCreate = () => {
        setFormDataDispositivo(null);
        handleOp();
    };
    const handleEdit = (data: DispositivoCreate) => {
        setFormDataDispositivo({
            id: data.id,
            nombre: data.nombre,
            codigo: data.codigo,
            ubicacion: data.ubicacion,
            esp32Mac: data.esp32Mac
        });
        handleOp();
    };

    const [openDelete, setOpenDelete] = useState(false);
    const handleOpDelete = () => setOpenDelete(!openDelete);
    const handleDeleteDevice = (data: DispositivoCreate) => {
        setFormDataDispositivo({
            id: data.id,
            nombre: data.nombre,
            codigo: data.codigo,
            ubicacion: data.ubicacion,
            esp32Mac: data.esp32Mac
        });
        handleOpDelete();
    }

    const handleView = () => {
        toast.success("Ya estás viendo el dispositivo 😎", {
            duration: 4000,
            position: "top-center",
            icon: "🧐",
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Dispositivos</h2>
                    <p className="text-gray-600">Gestiona tus dispositivos de medición</p>
                </div>
                <Button variant="gradient" color="blue" onClick={handleCreate}
                    className="flex items-center gap-3"
                    {...({} as React.ComponentProps<typeof Button>)}>
                    <Icon icon="mdi:plus" className="w-5 h-5" />
                    Nuevo Dispositivo
                </Button>
                <DialogDipositivo
                    open={open}
                    handleOp={handleOp}
                    onSubmit={handleSubmitDevice}
                    initialData={formDataDispositivo}
                />
                <ConfirmDeleteDialog
                    open={openDelete}
                    onClose={handleOpDelete}
                    data={formDataDispositivo}
                    onDelete={onDeleteDispositivo}
                />
            </div>

            {/* Devices Grid */}
            {isLoading && (
                <div className="mt-6 flex flex-col items-center justify-center text-gray-500 animate-pulse">
                    <span className="text-sm">Cargando dispositivos...</span>
                </div>
            )}

            {isError && (
                <div className="mt-6 flex flex-col items-center justify-center text-red-600">
                    <span className="text-sm">Ocurrió un error al cargar los dispositivos.</span>
                    <button
                        onClick={() => refetch()}
                        className="mt-2 px-4 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {!isLoading && !isError && dispositivos.length === 0 && (
                <div className="mt-6 flex flex-col items-center justify-center text-gray-600 text-center">
                    <span className="text-sm">
                        No hay dispositivos registrados aún.
                    </span>
                    <span className="text-xs mt-1">Agrega un nuevo dispositivo para comenzar a registrar eventos.</span>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
                {dispositivos.map((device) => (
                    <Card key={device.id} className="border-cyan-100 hover:shadow-lg transition-shadow p-3" {...({} as React.ComponentProps<typeof Card>)}>
                        <div className="space-y-1.5">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-2">
                                    <Icon icon="streamline-pixel:computers-devices-electronics-chipset" className="w-5 h-5 text-cyan-500" />
                                    <Typography variant="h4" className="text-lg" {...({} as React.ComponentProps<typeof Typography>)}>
                                        {device.nombre}
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                                <Icon icon="hugeicons:maps-location-01" className="w-4 h-4" />
                                ubicacion: <span>{device.ubicacion}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">codigo:</span>
                                    {device.codigo}
                                </div>
                            </div>

                            <div className="flex items-center space-x-1 text-sm ">
                                <Icon icon="hugeicons:machine-robot" className="w-4 h-4" />
                                <span className="text-gray-500">direcion-mac: </span>{device.esp32Mac}
                            </div>

                            <div className="flex space-x-2 pt-2">
                                <Button
                                    size="sm"
                                    variant="gradient"
                                    color="blue"
                                    onClick={handleView}
                                    className="flex-1 text-white flex items-center justify-center gap-1"
                                    {...({} as React.ComponentProps<typeof Button>)}
                                >
                                    <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
                                    Ver
                                </Button>
                                <Button color="green" variant="gradient" size="sm"
                                    onClick={() => handleEdit(device)}
                                    {...({} as React.ComponentProps<typeof Button>)}
                                >
                                    <Icon icon="carbon:edit" className="w-4 h-4" />
                                </Button>
                                <Button color="red" variant="gradient" size="sm"
                                    onClick={() => handleDeleteDevice(device)}
                                    {...({} as React.ComponentProps<typeof Button>)}
                                >
                                    <Icon icon="tabler:trash" className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
