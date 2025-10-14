import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

// Custom protected route to prevent unauthorised people. 
function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // refresh token fun. automatically refreshed the token. 
    const refreshToken = async () => {
        // First, set new const to fetch the refresh token. 
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            //Try to send a respond to this route with the refresh token obtained. 
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                // If error, for some reason... 
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        // Checks if person has a token... 
        const token = localStorage.getItem(ACCESS_TOKEN);
        // If not... 
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        // If do have a token... 
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        // < Now means it's expired. 
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;


CONTINUE AT 1:08:29