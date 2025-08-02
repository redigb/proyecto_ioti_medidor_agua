'use client'

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { Mediciones } from "../../../interfaces/mediciones"

type Props = {
    data: Mediciones[];
    filterByDevice?: string;
};

const LineChartRealtime: React.FC<Props> = ({ data, filterByDevice }) => {
    const [series, setSeries] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const filtered = filterByDevice
            ? data.filter((item) => item.dispositivoId === filterByDevice)
            : data;

        const sorted = [...filtered].sort(
            (a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime()
        );

        const timestamps = sorted.map((item) =>
            new Date(item.fechaHora).toLocaleTimeString("es-PE", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            })
        );
        const volumes = sorted.map((item) => item.volumen);

        setCategories(timestamps);
        setSeries([{ name: "Volumen", data: volumes }]);
    }, [data, filterByDevice]);

    return (
        <Chart
            type="line"
            height={350}
            series={[
                {
                    name: "Volumen",
                    data: data.map((item) => ({
                        x: new Date(item.fechaHora).getTime(),
                        y: item.volumen,
                    })),
                },
            ]}
            options={{
                chart: {
                    animations: {
                        enabled: true,
                        dynamicAnimation: {
                            enabled: true,
                            speed: 1000,
                        },
                        animateGradually: {
                            enabled: true,
                            delay: 150,
                        },
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ["#020617"],
                stroke: {
                    lineCap: "round",
                    curve: "smooth",
                },
                markers: {
                    size: 0,
                },
                xaxis: {
                    type: "datetime",
                    labels: {
                        format: "hh:mm tt",
                        style: {
                            colors: "#616161",
                            fontSize: "12px",
                            fontFamily: "inherit",
                            fontWeight: 400,
                        },
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                    },
                },
                yaxis: {
                    title: {
                        text: "Volumen (L)",
                    },
                    labels: {
                        style: {
                            colors: "#616161",
                            fontSize: "12px",
                            fontFamily: "inherit",
                            fontWeight: 400,
                        },
                    },
                },
                grid: {
                    show: true,
                    borderColor: "#dddddd",
                    strokeDashArray: 5,
                    xaxis: {
                        lines: {
                            show: true,
                        },
                    },
                    padding: {
                        top: 5,
                        right: 20,
                    },
                },
                fill: {
                    opacity: 0.8,
                },
                tooltip: {
                    theme: "dark",
                },
            }}
        />
    );
};

export default LineChartRealtime;
