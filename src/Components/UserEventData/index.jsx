import React, { useEffect, useState } from 'react'
import { Account } from '../../Pages/Account'
// import { useLocation } from 'react-router-dom'
// import { useCookies } from 'react-cookie'
// import { useNavigate } from 'react-router-dom'
import useAuth from '../../Context'

export default function UserEventData() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [savedEvents, setSavedEvents] = useState([])
  const { userSpotifyID } = useAuth()

  useEffect(() => {
    fetchUser()
    // fetchEvents()
  }, [])

  useEffect(() => {
    if (user) {
      setLoading(false)
    }
  }, [user])

  const fetchUser = async () => {
    const result = await fetch(`http://localhost:3001/user/${userSpotifyID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('result', result)
    const response = await result.json()
    console.log('responseeee', response)
    setUser({
      name: response[0].display_name,
      email: response[0].email,
    })
    console.log('user', user)
    console.log('response', response)
  }

  if (loading) {
    return <p>Loading</p>
  } else {
    return (
      <div>
        <p>Welcome {user.name}</p>
        <p>{user.email}</p>
      </div>
    )
  }
}

//   const fetchEvents = async () => {
//     const result = await fetch(
//       `http://localhost:3001/events/${userSpotifyID}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     )
//     const events = await result.json()
//     return (
//       <div>
//         <h1>Events you are interested in...</h1>
//         {events.map((event, index) => {
//           return (
//             <div>
//               <a href={event.url}>Event name: {event.event_name}</a>
//               <p>Date: {event.date}</p>
//               <p>City: {event.city}</p>
//             </div>
//           )
//         })}
//       </div>
//     )
//   }
