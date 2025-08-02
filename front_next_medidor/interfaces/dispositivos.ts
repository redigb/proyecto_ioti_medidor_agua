
export interface Dispositivo {
    id: string;
    nombre: string;
    codigo: string;
    ubicacion: string;
    esp32Mac: string;
}

// crear dispositivo
export interface DispositivoCreate {
    id?: string;
    nombre: string;
    codigo: string;
    ubicacion: string;
    esp32Mac: string;
}