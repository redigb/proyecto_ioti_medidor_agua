import axios from "axios";
// cambia segun el arranque "dev" // "prod"
// const isDev = import.meta.env.MODE === "development";
const baseURL = import.meta.env.VITE_API_URL;
// Aotomatic conect - backend with axios
export const authApi = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

// sin autentitcar - res - para peticiones
export const publicApi = axios.create({
    baseURL: baseURL,
});