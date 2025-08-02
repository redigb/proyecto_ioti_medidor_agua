import { useState } from "react"




import { Card, CardBody, Chip, Typography, } from "@material-tailwind/react"


import { Icon } from "@iconify/react/dist/iconify.js"

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
  const [selectedPeriod, setSelectedPeriod] = useState("7days")
  const [selectedDevice, setSelectedDevice] = useState("all")



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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Consumo Diario</h2>
          <p className="text-gray-600">Análisis del consumo de agua por dispositivo</p>
        </div>
        <div className="flex flex-col w-72">
          <label
            htmlFor="filtro-dispositivo"
            className="text-sm font-mediun mb-1 text-gray-600"
          >
            Filtrar por dispositivo:
          </label>
          <div className="relative">
            <select
              id="filtro-dispositivo"
              name="filtro-dispositivo"
              className="block w-full appearance-none px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos los dispositivos</option>
              <option value="Tanque Principal A">Tanque Principal A</option>
              <option value="Reservorio B">Reservorio B</option>
              <option value="Tanque Emergencia">Tanque Emergencia</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
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
        {/* Daily Consumption Table */}
        <Card className="border-cyan-100 p-4" {...({} as React.ComponentProps<typeof Card>)}>
          <div>
            <Typography variant="h4" {...({} as React.ComponentProps<typeof Typography>)}> Historial Diario</Typography>
            <p>Consumo por día con indicadores de exceso</p>
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
                {dailyConsumptionData.map((item, index) => (
                  <tr key={index} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-3 text-gray-600 font-medium">{new Date(item.date).toLocaleDateString("es-ES")}</td>
                    <td className="px-6 py-3 text-gray-600">{item.consumoTotal}</td>
                    <td className="px-6 py-3 text-gray-600">{item.exceso}2</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>

        {/* Device Consumption Table */}
        <Card className="border-cyan-100 p-4" {...({} as React.ComponentProps<typeof Card>)}>
          <div>
            <Typography variant="h4" {...({} as React.ComponentProps<typeof Typography>)}>Consumo por Dispositivo</Typography>
            <p>Detalle del consumo actual por dispositivo</p>
          </div>
          <CardBody {...({} as React.ComponentProps<typeof CardBody>)}>
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">Dispositivo</th>
                  <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">Consumo</th>
                  <th className="px-6 py-4 text-left font-semibold text-blue-700 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody>
                {deviceConsumptionData.map((item, index) => (
                  <tr key={index} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-3 text-gray-600">{item.device}</td>
                    <td className="px-6 py-3 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <span>{item.consumption}L</span>
                        <Chip variant="ghost" value={`${item.percentage} %`} />
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-600"> <Chip variant="ghost" value={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
