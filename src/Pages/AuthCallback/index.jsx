import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AuthCallback() {
    const location = useLocation();
    const [cookies, setCookie] = useCookies(["accessToken"])
    let navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code');
        handleCookie(code);
    }, [location])


   const handleCookie = async (code) => {
    
    const result = await fetch(`${process.env.REACT_APP_BAND_BUDDY_API_URL}/spotify-auth`, {
        method: 'post',
        body: JSON.stringify({code: code}),
        headers: {
            "Content-Type": "application/json"
        }
      })
      const response = await result.json();
      
      const { access_token } = response;
      setCookie("accessToken", access_token, {
        path: "/"
        
   })
   console.log(cookies.accessToken, "accessToken")
   navigate(`/`)
    }
}