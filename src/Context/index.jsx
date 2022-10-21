import React, { useMemo, useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export const AuthorisedContext = React.createContext({
  login: () => {},
  isAuthenticated: () => {},
  accessToken: '',
  spotifyUser: {},
  logout: () => {},
  userSpotifyID: '',
  fetchSpotifyUser: () => {},
})

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'])
  const [spotifyUser, setSpotifyUser] = useState(null)
  const [userSpotifyID, setUserSpotifyID] = useState('')

  const accessToken = cookies.accessToken

  useEffect(() => {
    // if (accessToken !== undefined) {
    //   fetchSpotifyUser()
    // }
    console.log('userSpotifyID in context', userSpotifyID)
  }, [accessToken])

  const login = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&scope=user-read-private%20user-read-email%20user-top-read`
  }
  const logout = () => {
    removeCookie('accessToken', {
      path: '/',
    })
    window.location.href = '/'
  }

  const isAuthenticated = () => {
    return cookies.accessToken !== undefined
  }

  const fetchSpotifyUser = async () => {
    console.log('fetchSpotifyUser hit')
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      console.log('response', response)
      if (response.status <= 200) {
        const data = await response.json()
        setSpotifyUser(data)
        setUserSpotifyID(data.id)
        console.log('data.id', data.id)
      } else {
        setSpotifyUser(null)
      }
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  const memoedValue = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
      accessToken,
      spotifyUser,
      userSpotifyID,
      fetchSpotifyUser,
    }),
    [isAuthenticated]
  )

  return (
    <AuthorisedContext.Provider value={memoedValue}>
      {children}
    </AuthorisedContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthorisedContext)
}
