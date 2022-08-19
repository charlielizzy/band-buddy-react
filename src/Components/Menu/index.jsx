import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Menu = (props) => {
  const navigate = useNavigate()

  return (
    <div data-automation="menu-bar" className="flex justify-center w-full ">
      <button
        data-automation="get-more-info"
        onClick={() => navigate(`/track/${props.spotifyTrackID}`)}
        className="m-5 p-1 bg-gray-900 text-align rounded-lg text-center text-3xl text-white"
      >
        <h3>Get More Artist Info</h3>
      </button>
    </div>
  )
}
