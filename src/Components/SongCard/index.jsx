import React, { useState } from 'react'

export const SongCard = (props) => {
  return (
    <div
      data-automation="songCard"
      className="flex flex-col items-center w-7/8 tracking-widest m-3 p-3 bg-gray-900 rounded-lg w-60 text-xl text-white"
    >
      <p>Title: {props.title} </p>
      <br />
      <p>Artist: {props.artist}</p>
    </div>
  )
}
