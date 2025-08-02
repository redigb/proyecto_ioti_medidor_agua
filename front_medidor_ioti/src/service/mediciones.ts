import { publicApi } from "./config/axios";
import type { Mediciones, MedicionesResponse } from "../interfaces/mediciones";

export const getMediciones = async (): Promise<MedicionesResponse> => {
    const { data } = await publicApi.get<MedicionesResponse>("/mediciones", {
        params: {
            perPage: 10,
        },
    });
    return data;
};

export const getMedicionesId = async (id: string): Promise<Mediciones[]> => {
    const { data } = await publicApi.get<Mediciones[]>(`/mediciones/dispositivo/${id}`);
    return data;
};

// eliminar mediciones ---  tal ves sea nesario