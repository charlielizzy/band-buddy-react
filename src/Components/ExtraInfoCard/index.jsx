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
      <p>Top Tracks: 1. 2. 3. 4. 5. </p>
      <br />
      <p>Social Media</p>
    </div>
  )
}
