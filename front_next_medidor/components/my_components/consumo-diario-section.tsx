'use client';

import { useState, useEffect } from "react"

import { Card, CardBody, Chip, Typography, } from "@material-tailwind/react"


// api
import { useConsumoDiario, useConsumoDiarioId, useConsumoDiarioIdResumen } from "@/hook/useConsumoDiario"
import { useDispositivos } from "@/hook/useDispositivos"


import { Icon } from "@iconify/react/dist/iconify.js"
import BarrasGraficMedias from "./graficos/BarrasGraficMedias"
import { ConsumoDiarios } from "@/interfaces/consumos-diarios"
import LinearPrediction from "./graficos/LinearPrediction"
// Mock data
const dailyConsumptionData = [
  { date: "2024-01-15", consumoTotal: 2847, exceso: false, dispositivos: 8 },
  { date: "2024-01-14", consumoTotal: 3120, exceso: true, dispositivos: 8 },
  { date: "2024-01-13", consumoTotal: 2654, exceso: false, dispositivos: 7 },
  { date: "2024-01-12", consumoTotal: 2890, exceso: false, dispositivos: 8 },
  { date: "2024-01-11", consumoTotal: 3350, exceso: true, dispositivos: 8 },
  { date: "2024-01-10", consumoTotal: 2756, exceso: false, dispositivos: 8 },
  { date: "2024-01-09", consumoTotal: 2943, exceso: false, dispositivos: 8 },
]

const deviceConsumptionData = [
  { device: "Tanque Principal A", consumption: 1200, percentage: 42, status: "normal" },
  { device: "Reservorio B", consumption: 890, percentage: 31, status: "normal" },
  { device: "Tanque Emergencia", consumption: 450, percentage: 16, status: "low" },
  { device: "Tanque Auxiliar", consumption: 307, percentage: 11, status: "normal" },
]

const chartData = dailyConsumptionData.map((item) => ({
  date: item.date.split("-")[2] + "/" + item.date.split("-")[1],
  consumo: item.consumoTotal,
  limite: 3000,
}))

const pieData = deviceConsumptionData.map((item) => ({
  name: item.device,
  value: item.consumption,
  percentage: item.percentage,
}))

const COLORS = ["#0891b2", "#10b981", "#f59e0b", "#8b5cf6"]

export default function ConsumoDiarioSeccion() {

  const { data: ConsumoDiaro, isLoading, isError, refetch } = useConsumoDiario();
  const ConsumoDiariosTodos = ConsumoDiaro ?? [];

  // Estado para el dispositivo seleccionado
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState<string>('');
  const { data: dataDispositivos } = useDispositivos();
  const dispositivos = dataDispositivos ?? [];
  // Mediciones por dispositivo seleccionado
  //const { data: dataConsumoId, refetch: recargarMedicionID } = useConsumoDiarioId(dispositivoSeleccionado);
  //const ConsumoDiarioPorId = dataConsumoId ?? [];

  const { data: dataConsumoId, refetch: recargarMedicionID } = useConsumoDiarioIdResumen(dispositivoSeleccionado);
  const ConsumoDiarioPorId = dataConsumoId ?? [];
  // Establecer primer dispositivo si no hay uno seleccionado
  useEffect(() => {
    if (dispositivos.length > 0 && !dispositivoSeleccionado) {
      const primerDispositivo = dispositivos[0];
      if (primerDispositivo?.id) {
        setDispositivoSeleccionado(primerDispositivo.id);
      }
    }
  }, [dispositivos]);
  // Refetch mediciones cuando cambia el dispositivo
  useEffect(() => {
    if (dispositivoSeleccionado) {
      recargarMedicionID();
    }
  }, [dispositivoSeleccionado]);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDispositivoSeleccionado(e.target.value);
  };




  /*const getStatusBadge = (status: string) => {
    const colors = {
      normal: "bg-green-100 text-green-800",
      low: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }
    const labels = {
      normal: "Normal",
      low: "Bajo",
      high: "Alto",
    }
    return <Badge className={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Badge>
  }*/

  const totalConsumption = dailyConsumptionData[0]?.consumoTotal || 0
  const averageConsumption = Math.round(
    dailyConsumptionData.reduce((acc, item) => acc + item.consumoTotal, 0) / dailyConsumptionData.length,
  );
  const excessDays = dailyConsumptionData.filter((item) => item.exceso).length;



  const datosFake: ConsumoDiarios[] = [
    { id: "1", dispositivoId: "abc", fecha: "2025-07-24", consumoTotal: 35.2, exceso: false },
    { id: "2", dispositivoId: "abc", fecha: "2025-07-25", consumoTotal: 36.1, exceso: false },
    { id: "3", dispositivoId: "abc", fecha: "2025-07-26", consumoTotal: 38.5, exceso: false },
    { id: "4", dispositivoId: "abc", fecha: "2025-07-27", consumoTotal: 40.0, exceso: false },
    { id: "5", dispositivoId: "abc", fecha: "2025-07-28", consumoTotal: 41.3, exceso: false },
    { id: "6", dispositivoId: "abc", fecha: "2025-07-29", consumoTotal: 40.8, exceso: false },
  ];

  const prediccionFake = {
    fecha: "2025-07-30",
    valor: 42.5
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Consumo de Agua</h2>
          <p className="text-gray-600">Análisis del consumo de agua en general y por dispositivo</p>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-cyan-100" {...({} as React.ComponentProps<typeof Card>)}>
          <CardBody className="p-4" {...({} as React.ComponentProps<typeof CardBody>)}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Consumo Ayer</p>
                <p className="text-2xl font-bold text-gray-900">{totalConsumption}L</p>
              </div>
              <Icon icon="whh:barchartalt" className="w-8 h-8 text-cyan-500" />
            </div>
          </CardBody>
        </Card>
        {/*<Card className="border-cyan-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Promedio Semanal</p>
                <p className="text-2xl font-bold text-gray-900">{averageConsumption}L</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Días con Exceso</p>
                <p className="text-2xl font-bold text-gray-900">{excessDays}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-amber-500" />
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historial Diario */}
        <Card className="border-cyan-100 p-4" {...({} as React.ComponentProps<typeof Card>)}>
          <div>
            <Typography variant="h4" {...({} as React.ComponentProps<typeof Typography>)}>Consumo en General</Typography>
            <p>Consumo general de todos los dispositivos</p>
          </div>

          <CardBody {...({} as React.ComponentProps<typeof CardBody>)}>
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">Consumo</th>
                  <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ConsumoDiariosTodos.map((item, index) => (
                  <tr key={index} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-3 text-gray-600 font-medium">
                      {new Date(item.fecha).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{String(item.consumoTotal)}</td>
                    <td className="px-6 py-3 text-gray-600">
                      <Chip
                        variant="ghost"
                        color={item.exceso ? "red" : "green"}
                        value={item.exceso ? "Exceso" : "Normal"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

         

          </CardBody>
        </Card>

        {/* Consumo por Dispositivo */}
        <Card className="border-cyan-100 p-4" {...({} as React.ComponentProps<typeof Card>)}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <Typography
                variant="h4"
                {...({} as React.ComponentProps<typeof Typography>)}
                className="text-blue-700 font-bold"
              >
                Consumo por Dispositivo: {dispositivoSeleccionado}
              </Typography>
              <p className="text-sm text-gray-600">Detalle del consumo actual por dispositivo</p>
            </div>

            {/* Filtro */}
            <div className="w-full sm:w-72">
              <label htmlFor="filtro-dispositivo" className="block text-sm font-medium mb-1 text-gray-700">
                Filtrar por dispositivo:
              </label>
              <div className="relative">
                <select
                  id="filtro-dispositivo"
                  name="filtro-dispositivo"
                  value={dispositivoSeleccionado}
                  onChange={handleChange}
                  className="block w-full appearance-none px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {dispositivos.map((dispositivo) => (
                    <option key={dispositivo.id} value={dispositivo.id}>
                      {dispositivo.nombre}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <CardBody {...({} as React.ComponentProps<typeof CardBody>)}>
            <div className="w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">Consumo</th>
                    <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {!dataConsumoId?.dispositivoId || dataConsumoId.ultimosConsumos.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4 text-gray-500">
                        No tiene registros de consumo diarios
                      </td>
                    </tr>
                  ) : (
                    dataConsumoId.ultimosConsumos.map((item) => (
                      <tr key={item.id} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-3 text-gray-600">{new Date(item.fecha).toLocaleDateString("es-ES")}</td>
                        <td className="px-6 py-3 text-gray-600">{String(item.consumoTotal)}</td>
                        <td className="px-6 py-3 text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Chip
                              variant="ghost"
                              color={item.exceso ? "red" : "green"}
                              value={item.exceso ? "Exceso" : "Normal"}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Media , Mediana y Varianza, por Dispositivo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
              <Card className="border-cyan-100" {...({} as React.ComponentProps<typeof Card>)}>
                <CardBody className="p-4" {...({} as React.ComponentProps<typeof CardBody>)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Mediana</p>
                      <p className="text-2xl font-bold text-gray-900">{String(dataConsumoId?.estadisticas.mediana)} m³</p>
                    </div>
                    <Icon icon="whh:barchartalt" className="w-8 h-8 text-cyan-500" />
                  </div>
                </CardBody>
              </Card>
              <Card className="border-cyan-100" {...({} as React.ComponentProps<typeof Card>)}>
                <CardBody className="p-4" {...({} as React.ComponentProps<typeof CardBody>)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Media</p>
                      <p className="text-2xl font-bold text-gray-900">{String(dataConsumoId?.estadisticas.media)} </p>
                    </div>
                    <Icon icon="whh:barchartalt" className="w-8 h-8 text-cyan-500" />
                  </div>
                </CardBody>
              </Card>
              <Card className="border-cyan-100" {...({} as React.ComponentProps<typeof Card>)}>
                <CardBody className="p-4" {...({} as React.ComponentProps<typeof CardBody>)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">varianza</p>
                      <p className="text-2xl font-bold text-gray-900">{String(dataConsumoId?.estadisticas.varianza)}</p>
                    </div>
                    <Icon icon="whh:barchartalt" className="w-8 h-8 text-cyan-500" />
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="p-4 space-y-6 mt-5">
              <h2 className="text-xl font-semibold">Consumo Diario + Predicción</h2>
              {Array.isArray(dataConsumoId?.ultimosConsumos) && dataConsumoId?.ultimosConsumos.length > 0 && (
                <LinearPrediction
                  data={dataConsumoId.ultimosConsumos}
                  prediccion={dataConsumoId?.prediccion}
                />
              )}
            </div>

            {/* Grafica mediana */}
            <div>
              {dataConsumoId?.estadisticas && (
                <BarrasGraficMedias
                  estadisticas={{
                    media: dataConsumoId.estadisticas.media,
                    mediana: dataConsumoId.estadisticas.mediana,
                    varianza: dataConsumoId.estadisticas.varianza,
                  }}
                />
              )}
            </div>
          </CardBody>
        </Card>
      </div>

    </div>
  )
}
