import React from 'react'
import useAuth from '../../Context'

export const ExtraInfoCard = (props) => {
  const { logout } = useAuth()
  console.log('artistID', props.artistID)
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
      <p>
        Top Tracks: 1.
        <a href={props.topTracks[0].url} target="_blank">
          {props.topTracks[0].name}
        </a>
        2.
        <a href={props.topTracks[1].url} target="_blank">
          {props.topTracks[1].name}
        </a>
        3.
        <a href={props.topTracks[2].url} target="_blank">
          {props.topTracks[2].name}
        </a>
        4.
        <a href={props.topTracks[3].url} target="_blank">
          {props.topTracks[3].name}
        </a>
        5.
        <a href={props.topTracks[4].url} target="_blank">
          {props.topTracks[4].name}
        </a>
      </p>
      <br />
      <p>
        Related Artists:
        <a href={props.relatedArtists[0].url} target="_blank">
          {props.relatedArtists[0].name}
        </a>
        ,
        <a href={props.relatedArtists[1].url} target="_blank">
          {props.relatedArtists[1].name}
        </a>
        ,
        <a href={props.relatedArtists[2].url} target="_blank">
          {props.relatedArtists[2].name}
        </a>
        ,
        <a href={props.relatedArtists[3].url} target="_blank">
          {props.relatedArtists[3].name}
        </a>
        ,
        <a href={props.relatedArtists[4].url} target="_blank">
          {props.relatedArtists[4].name}
        </a>
        ,
      </p>
      <br />
      <a
        href={`https://open.spotify.com/artist/${props.artistID}`}
        target="_blank"
      >
        Listen to this artist on Spotify
      </a>
      <br />
      {props.events !== null ? (
        <div>
          <p>Upcoming shows:</p>
          <p>
            <a href={props.events[0].url} target="_blank">
              {props.events[0].name}
            </a>
            , {props.events[0].city}, {props.events[0].date},
          </p>
          <p>
            <a href={props.events[1].url} target="_blank">
              {props.events[1].name}
            </a>
            , {props.events[1].city}, {props.events[1].date},
          </p>
          <p>
            <a href={props.events[2].url} target="_blank">
              {props.events[2].name}
            </a>
            , {props.events[2].city}, {props.events[2].date},
          </p>
          <p>
            <a href={props.events[3].url} target="_blank">
              {props.events[3].name}
            </a>
            , {props.events[3].city}, {props.events[3].date},
          </p>
          <p>
            <a href={props.events[4].url} target="_blank">
              {props.events[4].name}
            </a>
            , {props.events[4].city}, {props.events[4].date},
          </p>
        </div>
      ) : (
        <p>There are no upcoming shows for this artist</p>
      )}

      <br />
      <p>Social Media</p>
    </div>
  )
}
