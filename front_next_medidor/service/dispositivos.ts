import { publicApi } from "./config/axios";

// interface
import type { DispositivoCreate, Dispositivo } from "../interfaces/dispositivos";

export const getDispositivos = async (): Promise<Dispositivo[]> => {
    const { data } = await publicApi.get<Dispositivo[]>("/dispositivos");
    return data;
};

export const crearDispositivo = async (data: DispositivoCreate) => {
    try {
        const response = await publicApi.post("/dispositivos", data);
        return response.data;
    } catch (error) {
        console.error("Error al crear el dispositivo:", error);
        throw error;
    }
};

export const actualizarDispositivo = async (id: string, data: Partial<DispositivoCreate>) => {
    try {
        const response = await publicApi.put(`/dispositivos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el dispositivo:", error);
        throw error;
    }
};

export const eliminarDispositivo = async (id: string) => {
    const response = await publicApi.delete(`/dispositivos/${id}`);
    return response.data;
};