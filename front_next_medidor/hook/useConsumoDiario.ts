import { useQuery } from "@tanstack/react-query";
import { ConsumoDiarios, ConsumoPorDispositivo } from "@/interfaces/consumos-diarios";
import { getConsumoDiarios, getConsumoDiarioId, getConsumoDiarioIdResumen } from "@/service/consumoDiario";

export const useConsumoDiario = () => {
    return useQuery<ConsumoDiarios[], Error>({
        queryKey: ["consumo-diario"],
        queryFn: getConsumoDiarios,
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 10,   // 10 minutos
        refetchOnWindowFocus: false,
    });
};


export const useConsumoDiarioId = (id: string) => {
    return useQuery<ConsumoDiarios[], Error>({
        queryKey: ["consumo-diario-id-dispositivo"],
        queryFn: () => getConsumoDiarioId(id),
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 10,   // 10 minutos
        refetchOnWindowFocus: false,
    });
};


export const useConsumoDiarioIdResumen = (id: string) => {
    return useQuery<ConsumoPorDispositivo, Error>({
        queryKey: ["consumo-diario-id-dispositivo"],
        queryFn: () => getConsumoDiarioIdResumen(id),
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 10,   // 10 minutos
        refetchOnWindowFocus: false,
    });
};