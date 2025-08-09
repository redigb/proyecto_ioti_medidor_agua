
import { publicApi } from "./config/axios";
import type { ConsumoDiarios, ConsumoPorDispositivo } from "../interfaces/consumos-diarios";

export const getConsumoDiarios = async (): Promise<ConsumoDiarios[]> => {
    const { data } = await publicApi.get<ConsumoDiarios[]>("/consumos-diarios");
    return data;
};

export const getConsumoDiarioId = async (id: string): Promise<ConsumoDiarios[]> => {
    const { data } = await publicApi.get<ConsumoDiarios[]>(`/consumos-diarios/dispositivo/${id}`);
    return data;
};

export const getConsumoDiarioIdResumen = async (id: string): Promise<ConsumoPorDispositivo> => {
    const { data } = await publicApi.get<ConsumoPorDispositivo>(`/consumos-diarios/dispositivo/resumen/${id}`);
    return data;
};

