
export interface ConsumoDiarios {
    id: string;
    dispositivoId: string;
    fecha: string;
    consumoTotal: Number;
    exceso: boolean;
}

export interface Estadisticas {
    mediana: number;   // en m³
    media: number;     // en litros
    varianza: number;  // en litros²
}

export interface Prediccion {
    fecha: string;     // formato ISO: "2025-08-03"
    valor: number;     // valor predicho en m³
}

export interface ConsumoPorDispositivo {
    dispositivoId: string;
    ultimosConsumos: ConsumoDiarios[];
    estadisticas: Estadisticas;
    prediccion: Prediccion;
}