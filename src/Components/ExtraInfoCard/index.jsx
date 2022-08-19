import React from 'react'

export const ExtraInfoCard = (props) => {
  return (
    <div
      data-automation="extraInfoCard"
      className="tracking-widest m-5 p-3 bg-gray-900 rounded-lg w-60 text-3xl text-white"
    >
      <img src={props.albumArt} />
      <p>Artist: {props.artistName}</p>
      <br />
      <p>Song Name {props.trackName}</p>
      <br />
      <p>Album: {props.albumName}</p>
      <br />
      <p>
        Top Tracks: 1. {props.topTrackName[0].name} 2.
        {props.topTrackName[1].name} 3.
        {props.topTrackName[2].name} 4. {props.topTrackName[3].name} 5.
        {props.topTrackName[4].name}
      </p>
      <br />
      <p>Social Media</p>
    </div>
  )
}
