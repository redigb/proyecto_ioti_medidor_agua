'use client';

import React from 'react';
import dynamic from "next/dynamic";

import type { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


interface EstadisticasConsumo {
  media: number;
  mediana: number;
  varianza: number;
}

interface Props {
  estadisticas: EstadisticasConsumo;
}

const BarrasGraficMedias: React.FC<Props> = ({ estadisticas }) => {
  const series = [
    {
      name: 'Valor',
      data: [estadisticas.media, estadisticas.mediana, estadisticas.varianza],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar', // ✅ Tipo literal permitido
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Media', 'Mediana', 'Varianza'],
    },
    colors: ['#3b82f6'], // Azul Tailwind
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: true,
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Chart options={options} series={series} type="bar" height={320} />
    </div>
  );
};

export default BarrasGraficMedias;
