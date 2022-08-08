import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";

export default function AuthCallback() {
    const location = useLocation();
    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code');
        console.log("code", code)
    }, [location])
return(
    <h1>Auth callback page</h1>
)
}