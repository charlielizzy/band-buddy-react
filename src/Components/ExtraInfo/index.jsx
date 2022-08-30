import React from 'react'
import useAuth from '../../Context'
import { Maps } from '../Maps'

export const ExtraInfo = (props) => {
  const { logout } = useAuth()
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
            return (
              <div>
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
