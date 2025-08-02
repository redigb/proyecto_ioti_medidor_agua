import { useState, useEffect } from "react";

import {
    DialogHeader, DialogBody,
    DialogFooter, Typography, 
    Button, Input
} from "@material-tailwind/react";

// My component
import CustomModal from './CustomModal';
// interface
import type { DispositivoCreate } from "../../interfaces/dispositivos";

interface DialogDispositivoProps {
    open: boolean;
    handleOp: () => void;
    onSubmit: (data: DispositivoCreate | (DispositivoCreate & { id: string })) => void;
    initialData?: DispositivoCreate | null;
}


const DialogDipositivo = ({ open, handleOp, onSubmit, initialData }: DialogDispositivoProps) => {

    const [formData, setFormData] = useState<DispositivoCreate>({
        nombre: '',
        codigo: '',
        ubicacion: '',
        esp32Mac: '',
    });
    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre,
                codigo: initialData.codigo,
                ubicacion: initialData.ubicacion,
                esp32Mac: initialData.esp32Mac,
            });
        } else {
            // Limpiar si es nuevo
            setFormData({
                nombre: '',
                codigo: '',
                ubicacion: '',
                esp32Mac: '',
            });
        }
    }, [initialData, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.nombre && formData.codigo) {
            if (initialData?.id) {
                onSubmit({ ...formData, id: initialData.id }); // actualizar
            } else {
                onSubmit(formData); // crear
            }
            handleOp();
        }
    };

    return (
        <CustomModal open={open} onClose={handleOp} size="lg" closeOnOverlayClick={false}>
            <DialogHeader className="justify-between" {...({} as React.ComponentProps<typeof DialogHeader>)}>
                <Typography variant="h4" className="font-bold" {...({} as React.ComponentProps<typeof Typography>)}>
                    {initialData ? "Actualizar dispositivo" : "Registrar dispositivo"}
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Llena todos los campos requeridos
                    </p>
                </Typography>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
                <DialogBody className="max-h-[600px] overflow-auto p-5 flex flex-col gap-4" {...({} as React.ComponentProps<typeof DialogBody>)}>
                    <Input
                        label="Nombre del dispositivo"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        color="blue"
                        required
                        {...({} as React.ComponentProps<typeof Input>)}
                    />
                    <Input
                        label="Código"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        color="blue"
                        required
                        {...({} as React.ComponentProps<typeof Input>)}
                    />
                    <Input
                        label="Ubicación"
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        color="blue"
                        {...({} as React.ComponentProps<typeof Input>)}
                    />
                    <Input
                        label="MAC ESP32"
                        name="esp32Mac"
                        value={formData.esp32Mac}
                        onChange={handleChange}
                        color="blue"
                        required
                        {...({} as React.ComponentProps<typeof Input>)}
                    />
                </DialogBody>

                <DialogFooter className="flex justify-end p-2" {...({} as React.ComponentProps<typeof DialogFooter>)}>
                    <Button variant="outlined" color="gray" onClick={handleOp} className="mr-2" {...({} as React.ComponentProps<typeof Button>)}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="gradient" color="green" {...({} as React.ComponentProps<typeof Button>)}>
                        Confirmar
                    </Button>
                </DialogFooter>
            </form>
        </CustomModal>
    );
}

export default DialogDipositivo;