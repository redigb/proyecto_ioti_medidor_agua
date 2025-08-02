import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Header() {

    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-90 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 min-h-[4.5rem]">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Icon icon="game-icons:droplets" className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Celeste
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 leading-tight">Sistema de Monitoreo</p>
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4 text-lg text-gray-600 font-bold">
                        <span>{currentTime.toLocaleTimeString()}</span>
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-base font-medium text-gray-900">Administrador Sistema</p>
                    </div>
                </div>
            </div>
        </header>
    );
}