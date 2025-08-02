
import { publicApi } from "./config/axios";
import type { ConsumoDiarios } from "../interfaces/consumos-diarios";

export const getConsumoDiarios = async (): Promise<ConsumoDiarios[]> => {
    const { data } = await publicApi.get<ConsumoDiarios[]>("/consumos-diarios");
    return data;
};

export const getMedicionesId = async (id: string): Promise<ConsumoDiarios[]> => {
    const { data } = await publicApi.get<ConsumoDiarios[]>(`/consumos-diarios/dispositivo/${id}`);
    return data;
};


