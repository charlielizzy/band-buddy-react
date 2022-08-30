import React from 'react'

export const APIErrorCard = () => {
  return (
    <div
      data-automation="apiError"
      className="tracking-widest 3 p-3 bg-gray-900 rounded-lg w-60 text-xl text-white"
    >
      <p className="text-center">API Error</p>
    </div>
  )
}
