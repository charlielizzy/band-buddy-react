import React, { useState } from 'react'

export const SongNotFound = () => {
  return (
    <div
      data-automation="songNotFound"
      className="tracking-widest m-3 p-3 bg-gray-900 rounded-lg w-60 text-xl text-white"
    >
      <p className="text-center">
        We were unable to identify your song. Please try again
      </p>
    </div>
  )
}
