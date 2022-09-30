import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../Context'

export default function CheckUser() {
  let navigate = useNavigate()
  const { spotifyUser, userSpotifyID } = useAuth()

  useEffect(() => {
    addUser(userSpotifyID)
  }, [])

  const addUser = async (userSpotifyID) => {
    console.log('addUser triggered')
    console.log('userSpotifyID', userSpotifyID)
    try {
      const result = await fetch(
        `${process.env.REACT_APP_BAND_BUDDY_API_URL}/user/${userSpotifyID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            name: spotifyUser.name,
            email: spotifyUser.email,
          },
        }
      )
      console.log('result', result)
      result.status(200)
    } catch (error) {
      console.log('User Could Not Be Created', error)
    }
  }
  navigate('/')
}
