import React, { useEffect, useState } from 'react'
import useAuth from '../../Context'
import { Maps } from '../Maps'

export const ExtraInfo = (props) => {
  const [savedEventsArray, setsavedEventsArray] = useState([])
  const { logout } = useAuth()
  const { userSpotifyID } = useAuth()

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

  const handleClick = async (eventID, event_name, date, city, url) => {
    console.log('clicked')
    if (savedEventsArray.includes(eventID)) {
      try {
        const result = await fetch(
          `http://localhost:3001/events/${userSpotifyID}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              event_id: eventID,
            },
          }
        )
        const response = await result.json()

        return response
      } catch (error) {
        console.log('could not remove saved event')
      }
    } else {
      try {
        const result = await fetch(
          `http://localhost:3001/events/${userSpotifyID}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              event_name: event_name,
              date: date,
              city: city,
              url: url,
              event_id: eventID,
            },
          }
        )
        const response = await result.json()

        return response
      } catch (error) {
        console.log('this event could not be saved', error)
      }
    }
  }

  return (
    <div data-automation="extra-info-card" className="w-fit flex flex-col">
      <button
        className="hover:opacity-50 tracking-wider w-fit m-3 p-3 bg-gray-900 text-align rounded-lg text-center text-xl text-white font-bold"
        data-automation="logout-button"
        onClick={() => logout()}
      >
        Log Out
      </button>
      <div
        id="extra-track-info"
        className="tracking-widest m-3 p-3 bg-gray-900 rounded-lg text-xl text-white flex"
      >
        <img src={props.albumArt} className="w-60" />
        <div id="top-track-text" className="m-3">
          <p>Artist: {props.artistName}</p>
          <p>Song Name {props.trackName}</p>
          <p>Album: {props.albumName}</p>
          <a
            href={`https://open.spotify.com/artist/${props.artistID}`}
            target="_blank"
          >
            Listen to this artist on Spotify
          </a>
        </div>
      </div>

      <div
        id="top-tracks"
        className="tracking-widest m-3 p-3 bg-gray-900 rounded-lg text-xl text-white"
      >
        <p>Top Tracks</p>
        {props.topTracks.map((track, index) => {
          return (
            <div>
              {index + 1}.
              <a href={track.url} target="_blank">
                {track.name}
              </a>
            </div>
          )
        })}
      </div>

      <div
        id="related-artists"
        className="tracking-widest m-3 p-3 bg-gray-900 rounded-lg text-xl text-white"
      >
        <p>Related Artists: </p>
        {props.relatedArtists.map((relatedArtist, index) => {
          return (
            <a href={relatedArtist.url} target="_blank">
              {relatedArtist.name}
            </a>
          )
        })}
      </div>

      <div
        id="events-section"
        className="flex tracking-widest m-3 p-3 bg-gray-900 rounded-lg text-xl text-white"
      >
        {props.events.length > 0 ? (
          <div className="flex flex-col items-center">
            <p>Upcoming shows:</p>
            <div id="events-container" className="flex">
              {props.events.map((event, index) => {
                return (
                  <div id="event" className="m-3">
                    <div
                      id="event-details"
                      className="flex justify-between items-center"
                    >
                      <div id="event-text">
                        <a href={event.url} target="_blank">
                          {event.name}
                        </a>

                        <p>{event.city}</p>
                        <p>{event.date}</p>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className={`w-12 h-12 p-2 m-2 ${
                          savedEventsArray.includes(event.eventID)
                            ? `fill-red-500`
                            : null
                        }`}
                        onClick={() =>
                          handleClick(
                            event.eventID,
                            event.name,
                            event.date,
                            event.city,
                            event.url
                          )
                        }
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div>

                    <Maps coordinates={event.coordinates} />
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <p>There are no upcoming shows for this artist</p>
        )}
      </div>
    </div>
  )
}
