
import { Icon } from "@iconify/react/dist/iconify.js";
import {
    DialogBody, Typography, DialogFooter,
    DialogHeader, Button
} from "@material-tailwind/react";
import CustomModal from "./CustomModal";
import type { DispositivoCreate } from "../../interfaces/dispositivos";


interface PropsDelete {
    open: boolean;
    onClose: () => void;
    data: DispositivoCreate | null;
    onDelete: (id: string) => void;
};
export function ConfirmDeleteDialog({ open, onClose, data, onDelete }: PropsDelete) {
    if (!data) return null;
    return (
        <CustomModal open={open} onClose={onClose}>
            <DialogHeader {...({} as React.ComponentProps<typeof DialogHeader>)}>
                <Typography variant="h5" color="blue-gray" {...({} as React.ComponentProps<typeof Typography>)}>
                    Eliminar ?
                </Typography>
            </DialogHeader>
            <DialogBody divider className="grid place-items-center gap-4" {...({} as React.ComponentProps<typeof DialogBody>)}>
                <Icon icon="bxs:trash" className="h-16 w-16 text-red-500" />
                <Typography color="red" variant="h4" {...({} as React.ComponentProps<typeof Typography>)}>
                    {data.nombre}
                </Typography>
                <Typography className="text-center font-normal" {...({} as React.ComponentProps<typeof Typography>)}>
                    Borrar todos lo registros del dispositivo
                </Typography>
            </DialogBody>
            <DialogFooter className="space-x-2" {...({} as React.ComponentProps<typeof DialogFooter>)}>
                <Button variant="outlined" color="gray" onClick={onClose} className="mr-2" {...({} as React.ComponentProps<typeof Button>)}>
                    Cancelar
                </Button>
                <Button variant="gradient" onClick={() => {onDelete(data.id!); onClose();}} {...({} as React.ComponentProps<typeof Button>)}>
                    Eliminar
                </Button>
            </DialogFooter>
        </CustomModal>
    );
}