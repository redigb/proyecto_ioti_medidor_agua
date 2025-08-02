import { useState, useEffect } from "react";

import LoginPage from "./LoginPage";
import DashboardApp from "./dashboard";
import { Toaster } from "react-hot-toast";


export default function Application() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const authData = localStorage.getItem("auth");
        if (authData) {
            const { expiry } = JSON.parse(authData);
            if (new Date().getTime() < expiry) {
                setIsLoggedIn(true);
            } else {
                localStorage.removeItem("auth");
            }
        }
    }, []);


    return (
        <>
            {isLoggedIn ? (
                <DashboardApp />
            ) : (
                <LoginPage setAuth={setIsLoggedIn} />
            )}
            <Toaster />
        </>
    );
}