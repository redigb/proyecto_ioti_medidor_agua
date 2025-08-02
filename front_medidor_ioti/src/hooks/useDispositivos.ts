import { useQuery } from "@tanstack/react-query";
import { getDispositivos } from "../service/dispositivos";
import type { Dispositivo } from "../interfaces/dispositivos";

export const useDispositivos= () => {
    return useQuery<Dispositivo[], Error>({
        queryKey: ["dispositivos"],
        queryFn: getDispositivos,
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 10,   // 10 minutos
        refetchOnWindowFocus: false,
    });
};