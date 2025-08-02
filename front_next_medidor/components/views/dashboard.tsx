import React from "react";

// components
import {
    Chip, Card, CardBody, Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react/dist/iconify.js";
// My components
import Header from "../my_components/header";
import DevicesSection from "../my_components/devices-section";
import MedicionesSection from "../my_components/mediciones-section";
import ConsumoDiarioSeccion from "../my_components/consumo-diario-section";



export default function DashboardApp() {

    const data = [
        {
            label: "DISPOSITIVOS",
            value: "dispositivos",
            icon: "streamline-pixel:computers-devices-electronics-chipset",
            desc: <DevicesSection />,
        },
        {
            label: "MEDICIONES",
            value: "mediciones",
            icon: "streamline-freehand:ruler-t",
            desc: <MedicionesSection />,
        },
        {
            label: "CONSUMO",
            value: "consumo",
            icon: "material-symbols:bar-chart-4-bars-rounded",
            desc: <ConsumoDiarioSeccion />,
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Secion de Bienvenida */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Título y subtítulo */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Bienvenido, Administrador 👋
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Resumen del estado actual de tus dispositivos
                            </p>
                        </div>

                        {/* Chips */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                            <Chip variant="ghost" value="Administrador" color="blue" />
                            <Chip
                                variant="ghost"
                                value={
                                    <span className="flex items-center">
                                        <Icon icon="tabler:activity" className="w-3 h-3 mr-1" />
                                        Sistema Activo
                                    </span>
                                }
                                className="text-green-600 bg-green-50 border border-green-200"
                            />
                        </div>
                    </div>
                </div>
                {/* Detalles de cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* CARD 1 */}
                    <Card variant="gradient" color="blue" className="border-0 shadow-lg text-white overflow-hidden relative" {...({} as React.ComponentProps<typeof Card>)}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                        <CardBody className="flex flex-col justify-between h-full space-y-3" {...({} as React.ComponentProps<typeof CardBody>)}>
                            <div className="flex items-center justify-between">
                                <Typography variant="h6" className="font-semibold text-white uppercase tracking-wide text-sm" {...({} as React.ComponentProps<typeof Typography>)}>
                                    Total Dispositivos
                                </Typography>
                                <Icon icon="game-icons:droplets" className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-4xl font-extrabold">12</div>
                            <div className="flex items-center gap-2 text-white text-sm">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                <span>+2 este mes</span>
                            </div>
                        </CardBody>
                    </Card>

                    {/* CARD 2 */}
                    <Card variant="gradient" color="green" className="border-0 shadow-lg text-white overflow-hidden relative" {...({} as React.ComponentProps<typeof Card>)}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                        <CardBody className="flex flex-col justify-between h-full space-y-3" {...({} as React.ComponentProps<typeof CardBody>)}>
                            <div className="flex items-center justify-between">
                                <Typography variant="h6" className="font-semibold text-white uppercase tracking-wide text-sm" {...({} as React.ComponentProps<typeof Typography>)}>
                                    Mediciones Activas
                                </Typography>
                                <Icon icon="lucide:activity" className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-4xl font-extrabold">8</div>
                            <div className="flex items-center gap-2 text-white text-sm">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                <span>Tiempo real</span>
                            </div>
                        </CardBody>
                    </Card>

                    {/* CARD 3 */}
                    <Card variant="gradient" color="deep-purple" className="border-0 shadow-lg text-white overflow-hidden relative" {...({} as React.ComponentProps<typeof Card>)}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                        <CardBody className="flex flex-col justify-between h-full space-y-3" {...({} as React.ComponentProps<typeof CardBody>)}>
                            <div className="flex items-center justify-between">
                                <Typography variant="h6" className="font-semibold text-purple-100 uppercase tracking-wide text-sm" {...({} as React.ComponentProps<typeof Typography>)}>
                                    Consumo Diario
                                </Typography>
                                <Icon icon="ix:barchart" className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-4xl font-extrabold">2847L</div>
                            <div className="flex items-center gap-2 text-white text-sm">
                                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                                <span>-5% vs ayer</span>
                            </div>
                        </CardBody>
                    </Card>

                    {/* CARD 4 
                    <Card variant="gradient" color="orange" className="border-0 shadow-lg text-white overflow-hidden relative" {...({} as React.ComponentProps<typeof Card>)}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                        <CardBody className="flex flex-col justify-between h-full space-y-3" {...({} as React.ComponentProps<typeof CardBody>)}>
                            <div className="flex items-center justify-between">
                                <Typography variant="h6" className="font-semibold text-amber-100 uppercase tracking-wide text-sm" {...({} as React.ComponentProps<typeof Typography>)}>
                                    Alertas Activas
                                </Typography>
                                <Icon icon="tabler:alert-triangle" className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-4xl font-extrabold">3</div>
                            <div className="flex items-center gap-2 text-white text-sm">
                                <Icon icon="tabler:alert-triangle" className="w-3 h-3" />
                                <span>Requieren atención</span>
                            </div>
                        </CardBody>
                    </Card>*/}
                </div>
                <Tabs value="mediciones">
                    <TabsHeader {...({} as React.ComponentProps<typeof TabsHeader>)}
                        className="z-1 border-1 border-blue-300/20 bg-gray-700"
                        indicatorProps={{
                            className: "bg-gradient-to-r from-cyan-500 to-blue-600",
                        }}>
                        {data.map(({ label, value, icon }) => (
                            <Tab key={value} {...({} as React.ComponentProps<typeof Tab>)} value={value} className="text-gray-800 font-bold">
                                <div className={`flex items-center gap-2 text-white`}>
                                    <Icon icon={icon} className="w-4 h-4 hidden sm:block" />
                                    {label}
                                </div>
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody {...({} as React.ComponentProps<typeof TabsBody>)}>
                        {data.map(({ value, desc }) => (
                            <TabPanel key={value} value={value} className="z-0">
                                {desc}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </div>
        </div>
    );
}