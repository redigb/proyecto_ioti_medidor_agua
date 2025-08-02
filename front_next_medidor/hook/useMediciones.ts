import { useQuery } from "@tanstack/react-query";
import { getMediciones, getMedicionesId } from "../service/mediciones";
import type { Mediciones, MedicionesResponse } from "../interfaces/mediciones";

export const useMediciones = () => {
    return useQuery<MedicionesResponse, Error>({
        queryKey: ["mediciones"],
        queryFn: getMediciones,
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 10,   // 10 minutos
        refetchOnWindowFocus: false,
    });
};

export const useMedicionesId = (id: string) => {
    return useQuery<Mediciones[], Error>({
        queryKey: ["mediciones-id-dispositivo"],
        queryFn: () => getMedicionesId(id),
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 10,   // 10 minutos
        refetchOnWindowFocus: false,
    });
};