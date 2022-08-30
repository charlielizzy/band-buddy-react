import React, { useEffect, useState } from 'react'
import useAuth from '../../Context'

export default function UserEventData() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [savedEvents, setSavedEvents] = useState([])
  const { userSpotifyID } = useAuth()

  useEffect(() => {
    fetchUser()
    fetchEvents()
  }, [])

  useEffect(() => {
    if (user && savedEvents) {
      setLoading(false)
    }
  }, [user, savedEvents])

  const fetchUser = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_BAND_BUDDY_API_URL}/user/${userSpotifyID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const response = await result.json()
    setUser({
      name: response.name,
      email: response.email,
    })
  }

  const fetchEvents = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_BAND_BUDDY_API_URL}/events/${userSpotifyID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const response = await result.json()
    setSavedEvents(response)
  }

  if (loading) {
    return <p>Loading</p>
  } else {
    return (
      <div className="tracking-widest m-3 p-3 bg-gray-900 rounded-lg text-xl text-white">
        <p>Welcome to your Band Buddy account details!</p>
        <p className="capitalize">Name: {user.name}</p>
        <p>Username: {user.email}</p>

        <h1>Events you are interested in...</h1>
        {savedEvents.map((event, index) => {
          return (
            <div>
              <a href={event.url}>Event name: {event.event_name}</a>
              <p>Date: {event.date}</p>
              <p>City: {event.city}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
