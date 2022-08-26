import React, { useEffect, useState } from 'react'
import useAuth from '../../Context'
import { Maps } from '../Maps'

export const ExtraInfo = (props) => {
  const [savedEventsArray, setsavedEventsArray] = useState([])
  const { logout } = useAuth()
  const { userSpotifyID } = useAuth()

  const handleClick = (eventID) => {
    if (savedEventsArray.includes(eventID)) {
      //remove event from saved events database
    } else {
      //add event to saved events database
    }
    //run fetch saved events function again to update state with new array of saved events
  }

  useEffect(() => {
    fetchSavedEvents()
  }, [])

  const fetchSavedEvents = async () => {
    const result = await fetch(
      `http://localhost:3001/events/${userSpotifyID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const response = await result.json()
    const eventIDs = response.map((event, index) => {
      return event.event_id
    })
    setsavedEventsArray(eventIDs)
  }

  return (
    <div
      data-automation="extra-info-card"
      className="tracking-widest m-5 p-3 bg-gray-900 rounded-lg text-3xl text-white"
    >
      <button
        className="hover:opacity-50 tracking-wider m-5 p-3 bg-gray-900 text-align rounded-lg text-center text-3xl text-white font-bold"
        data-automation="logout-button"
        onClick={() => logout()}
      >
        Log Out
      </button>
      <img src={props.albumArt} className="w-60" />
      <p>Artist: {props.artistName}</p>
      <br />
      <p>Song Name {props.trackName}</p>
      <br />
      <p>Album: {props.albumName}</p>
      <br />
      <p>Top Tracks</p>
      {props.topTracks.map((track, index) => {
        return (
          <div>
            <p>
              {index + 1}.
              <a href={track.url} target="_blank">
                {track.name}
              </a>
            </p>
          </div>
        )
      })}
      <br />
      <p>Related Artists: </p>
      {console.log('props.relatedArtists', props.relatedArtists)}
      {props.relatedArtists.map((relatedArtist, index) => {
        return (
          <a href={relatedArtist.url} target="_blank">
            {relatedArtist.name}
          </a>
        )
      })}
      <br />
      <a
        href={`https://open.spotify.com/artist/${props.artistID}`}
        target="_blank"
      >
        Listen to this artist on Spotify
      </a>
      <br />
      {props.events.length > 0 ? (
        <div>
          <p>Upcoming shows:</p>
          {props.events.map((event, index) => {
            // console.log(event.eventID)
            // const [saved, setSaved] = useState(false)
            return (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class={`w-6 h-6  ${
                    savedEventsArray.includes(event.eventID)
                      ? `fill-red-500`
                      : null
                  }`}
                  onClick={() => handleClick(event.eventID)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>

                <p>
                  <a href={event.url} target="_blank">
                    {event.name}
                  </a>
                  , {event.city}, {event.date},
                </p>
                <Maps coordinates={event.coordinates} />
              </div>
            )
          })}
        </div>
      ) : (
        <p>There are no upcoming shows for this artist</p>
      )}

      <br />
      <p>Social Media</p>
    </div>
  )
}
