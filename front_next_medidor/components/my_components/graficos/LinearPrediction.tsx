'use client'

import React from "react";
import dynamic from "next/dynamic";
import type { ConsumerProps } from "react";
import { ConsumoDiarios } from "@/interfaces/consumos-diarios";

// 👇 Import dinámico de ApexCharts (solo en el cliente)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  data: ConsumoDiarios[];
  prediccion?: {
    fecha: string;
    valor: number;
  };
}

const LinearPrediction: React.FC<Props> = ({ data, prediccion }) => {
  const categorias = data.map((item) => item.fecha);
  const valores = data.map((item) => item.consumoTotal);

  const prediccionValores = Array(data.length).fill(null); // todos null para no conectar
  if (prediccion) {
    categorias.push("Próx.");
    prediccionValores.push(prediccion.valor);
  }

  const series = [
    {
      name: "Consumo Real",
      data: valores,
    },
    {
      name: "Predicción",
      data: prediccionValores,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: [2, 2],
    },
    markers: {
      size: [4, 6],
      colors: ["#2563EB", "#FACC15"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    xaxis: {
      categories: categorias, // ← esto ya no debe fallar
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      show: true,
      position: 'top',
    },
  };

  return (
    <div className="w-full">
      <Chart
        options={options}
        series={series}
        type="line"
        height={300}
      />
    </div>
  );
};

export default LinearPrediction;
