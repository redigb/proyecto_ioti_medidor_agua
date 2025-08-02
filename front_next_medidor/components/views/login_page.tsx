


import { useState } from "react";

import { Button, Input, Typography, Card, CardHeader, CardBody } from "@material-tailwind/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";

// data-users
// import users from '../data/users.json'

interface PropsLoginPage {
  setAuth: (estado: boolean) => void;
}


const LoginPage = (props: PropsLoginPage) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (username === "celeste" && password === "admin123") {
        // Guardar token simulado y hora de expiración (2 horas)
        const expiry = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 horas
        localStorage.setItem("auth", JSON.stringify({ username, expiry }));
        // Aquí rediriges al dashboard, ejemplo:
        props.setAuth(true);
        //window.location.href = "/dashboard"; // o cambiar el estado del componente si estás en SPA
        toast.success('Bienvenido administrador 🍃',{duration: 3000 });
      } else {
        setError("Usuario o contraseña incorrectos.");
        setIsLoading(false);
      }
    }, 1000); // Simula retardo
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm">
        {/* Formulario de login */}
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
          <Card className="w-full border-0 shadow-none bg-transparent"  {...({} as React.ComponentProps<typeof Card>)}>
            <CardHeader variant="gradient" className="bg-cyan-500 mb-4 grid h-28 place-items-center mt-1" {...({} as React.ComponentProps<typeof CardHeader>)}>
              <Typography variant="h3" className="text-center text-white" {...({} as React.ComponentProps<typeof Typography>)}>
                Iniciar Sesión
              </Typography>
              <span className="text-center text-gray-100">
                Ingresa tus credenciales para acceder al sistema
              </span>
            </CardHeader>
            <CardBody className="space-y-4" {...({} as React.ComponentProps<typeof CardBody>)}>
              <form onSubmit={handleLogin} className="space-y-4">

                {/* Usuario */}
                <div className="space-y-2">
                  <Typography className="text-gray-700" {...({} as React.ComponentProps<typeof Typography>)}>
                    Usuario
                  </Typography>
                  <div className="relative">
                    <Icon icon="bxs:user" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="username"
                      color="blue"
                      type="text"
                      placeholder="Ingresa tu usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                      {...({} as React.ComponentProps<typeof Input>)}
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div className="space-y-2">
                  <Typography className="text-gray-700" {...({} as React.ComponentProps<typeof Typography>)}>
                    Contraseña
                  </Typography>
                  <div className="relative">
                    <Icon icon="material-symbols:lock" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      color="blue"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      {...({} as React.ComponentProps<typeof Input>)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <Icon icon="mdi:eye-off" className="w-4 h-4" />
                      ) : (
                        <Icon icon="mdi:eye" className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {/* Mensaje de error */}
                {error && (
                  <div className="text-red-600 text-sm text-center font-medium">
                    {error}
                  </div>
                )}


                {/* Botón login */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 
                   hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-3 text-md 
                  flex items-center justify-center gap-2"
                  disabled={isLoading}
                  {...({} as React.ComponentProps<typeof Button>)}
                >
                  {isLoading ? (
                    <>
                      <Icon icon="lucide:loader" className="w-4 h-4 animate-spin" />
                      <span>Iniciando sesión...</span>
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>

        {/* Logo e identidad */}
        <div className="w-full md:w-1/2 bg-gradient-to-tr from-cyan-400 to-cyan-600 text-white flex flex-col justify-center items-center p-8 space-y-4">
          <div className="w-20 h-20  bg-opacity-20 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon icon="game-icons:droplets" className="w-10 h-10 text-white" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold">Celeste</h1>
            <p className="text-white/90">Sistema Inteligente de Monitoreo de Almacenes de agua IOTI</p>
          </div>
        </div>

      </div>
    </div>

  )
}

export default LoginPage;