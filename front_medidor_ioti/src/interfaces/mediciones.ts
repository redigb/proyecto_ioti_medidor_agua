
export interface Mediciones{
    id: string;
    dispositivoId: string;
    distancia: string;
    volumen: string;
    nivel: string;
    fechaHora: string;
}

export interface MedicionesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  items: Mediciones[];
}