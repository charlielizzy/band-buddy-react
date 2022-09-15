import React, { useEffect, useState } from 'react'
import useAuth from '../../Context'
import { Maps } from '../Maps'
import { useNavigate } from 'react-router-dom'

export const ExtraInfo = (props) => {
  const [savedEventsArray, setsavedEventsArray] = useState([])
  const { logout } = useAuth()
  const { userSpotifyID } = useAuth()
  let navigate = useNavigate()

  useEffect(() => {
    fetchSavedEvents()
  }, [])
  console.log(userSpotifyID)

  const fetchSavedEvents = async () => {
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
    const eventIDs = response.map((event, index) => {
      return event.event_id
    })
    console.log('eventIDs', eventIDs)
    setsavedEventsArray(eventIDs)
  }

  const handleClick = async (eventID, event_name, date, city, url) => {
    console.log('clicked')
    if (savedEventsArray.includes(eventID)) {
      try {
        const data = {
          event_id: eventID,
        }
        const result = await fetch(
          `${process.env.REACT_APP_BAND_BUDDY_API_URL}/events/${userSpotifyID}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        )
        console.log('savedEventsArray - removed', savedEventsArray)
        fetchSavedEvents()
      } catch (error) {
        console.log('could not remove saved event')
      }
    } else {
      try {
        const data = {
          event_name: event_name,
          date: date,
          city: city,
          url: url,
          event_id: eventID,
        }
        const result = await fetch(
          `${process.env.REACT_APP_BAND_BUDDY_API_URL}/events/${userSpotifyID}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        )
        const response = await result.json()
        console.log('savedEventsArray - added', savedEventsArray)
        fetchSavedEvents()
      } catch (error) {
        console.log('this event could not be saved', error)
      }
    }
  }
  console.log('savedEventsArray', savedEventsArray)
  return (
    <div data-automation="extra-info-card" className="w-fit flex flex-col">
      <div>
        <button
          className="hover:opacity-50 tracking-wider w-fit m-3 p-3 bg-gray-900 text-align rounded-lg text-center text-xl text-white font-bold"
          data-automation="logout-button"
          onClick={() => logout()}
        >
          Log Out
        </button>
        <button
          className="hover:opacity-50 tracking-wider w-fit m-3 p-3 bg-gray-900 text-align rounded-lg text-center text-xl text-white font-bold"
          data-automation="return-to-home-button"
          onClick={() => navigate('/')}
        >
          Return to Recording
        </button>
        <button
          className="hover:opacity-50 tracking-wider w-fit m-3 p-3 bg-gray-900 text-align rounded-lg text-center text-xl text-white font-bold"
          data-automation="account-button"
          onClick={() => navigate(`/user/${userSpotifyID}`)}
        >
          My Account
        </button>
      </div>
      <div className="flex">
        <div
          id="extra-track-info"
          className="tracking-widest m-3 p-3 bg-gray-900 rounded-lg text-xl text-white flex"
        >
          <img src={props.albumArt} className="w-60" />
          <div id="top-track-text" className="m-3">
            <p className="m-3">Artist: {props.artistName}</p>
            <p className="m-3">Song Name: {props.trackName}</p>
            <p className="m-3">Album: {props.albumName}</p>
            <a
              href={`https://open.spotify.com/artist/${props.artistID}`}
              target="_blank"
              className="m-3 flex"
            >
              Listen to this artist on Spotify
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div
          id="top-tracks"
          className="tracking-widest m-3 p-3 bg-gray-900 rounded-lg text-white"
        >
          <h1 className="text-xl font-bold m-3">
            Listen to Top Tracks on Spotify
          </h1>
          {props.topTracks.map((track, index) => {
            return (
              <div className="text-lg flex" key={index}>
                {index + 1}.
                <a href={track.url} target="_blank" className="flex ml-2">
                  {track.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                    />
                  </svg>
                </a>
              </div>
            )
          })}
        </div>

        <div
          id="related-artists"
          className="tracking-widest m-3 p-3 bg-gray-900 rounded-lg text-white"
        >
          <h1 className="text-xl font-bold m-3">
            Listen to Related Artists on Spotify:
          </h1>
          {props.relatedArtists.map((relatedArtist, index) => {
            return (
              <a
                href={relatedArtist.url}
                target="_blank"
                className="text-lg m-3 flex"
                key={index}
              >
                {relatedArtist.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                  />
                </svg>
                <br />
              </a>
            )
          })}
        </div>
      </div>

      <div
        id="events-section"
        className="flex w-screen p-3 bg-gray-900 rounded-lg text-white"
      >
        {props.events.length > 0 ? (
          <div className="flex flex-col items-center bg-gray-900 rounded-lg text-white text-lg">
            <h1 className="text-xl font-bold m-3">Upcoming shows:</h1>
            <div id="events-container" className="flex">
              {props.events.map((event, index) => {
                return (
                  <div key={index} id="event" className="m-3">
                    <div
                      id="event-details"
                      className="flex justify-between items-center"
                    >
                      <div id="event-text" className="text-lg">
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
                        strokeWidth="1.5"
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
