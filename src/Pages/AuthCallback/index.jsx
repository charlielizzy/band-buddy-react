import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAuth from '../../Context'

export default function AuthCallback() {
  const location = useLocation()
  const [cookies, setCookie] = useCookies(['accessToken'])
  let navigate = useNavigate()
  const { user, userSpotifyID } = useAuth()

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code')
    handleCookie(code)
  }, [location])

  const addUser = async (userSpotifyID) => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_BAND_BUDDY_API_URL}/user/${userSpotifyID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            name: user.name,
            email: user.email,
          },
        }
      )
      result.status(200)
    } catch (error) {
      console.log('User Could Not Be Created', error)
    }
  }
  console.log('user', user)
  const handleCookie = async (code) => {
    const result = await fetch(
      `${process.env.REACT_APP_BAND_BUDDY_API_URL}/spotify-auth`,
      {
        method: 'post',
        body: JSON.stringify({ code: code }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const response = await result.json()

    const { access_token } = response
    setCookie('accessToken', access_token, {
      path: '/',
    })
    addUser(userSpotifyID)
    navigate(`/`)
  }
}
