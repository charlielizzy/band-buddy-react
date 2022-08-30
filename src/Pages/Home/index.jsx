import React, { useState } from 'react'
import { SongCard } from '../../Components/SongCard'
import { ExtraInfo } from '../../Components/ExtraInfo'
import { APIErrorCard } from '../../Components/APIError'
import { RecordingButton } from '../../Components/RecordingButton'
import { SongNotFound } from '../../Components/SongNotFound'
import { Menu } from '../../Components/Menu'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../Context'

export default function Home() {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [songNotFound, setSongNotFound] = useState(false)
  const [cardState, setCardState] = useState('songCard')
  const [APIError, setAPIError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'])

  const { login, isAuthenticated, logout } = useAuth()

  let navigate = useNavigate()

  const [spotifyTrackID, setSpotifyTrackID] = useState('')

  return (
    <div className="flex bg-gray-900">
      <div className="tracking-wider ml-80 p-2 text-align rounded-lg text-center w-60 text-9xl text-white font-bold">
        <br />
        <h1>BandBuddy</h1>
        <br />
      </div>
      <div className="grid h-screen place-items-center">
        {isAuthenticated() ? (
          <div className="border-2">
            <button
              className="hover:opacity-50 tracking-wider m-2 p-2 bg-gray-900 text-align rounded-lg text-center text-3xl text-white font-bold"
              data-automation="logout-button"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <div>
              <p className="m-5 bg-gray-900 text-align rounded-lg text-3xl  text-white">
                Please sign into your Spotify account to use Band Buddy
              </p>
            </div>
            <button
              className="border-2 hover:opacity-50 tracking-wider m-5 p-3 bg-gray-900 text-align rounded-lg text-center text-3xl text-white font-bold"
              data-automation="login-button"
              onClick={() => login()}
            >
              Login
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center  w-screen h-screen">
        {cookies.accessToken !== undefined ? (
          <div className="m-5 p-3 bg-gray-900 text-align rounded-lg text-center w-60 text-3xl text-white">
            <RecordingButton
              setTitle={setTitle}
              setArtist={setArtist}
              setSongNotFound={setSongNotFound}
              setCardState={setCardState}
              setAPIError={setAPIError}
              setLoading={setLoading}
              loading={loading}
              setSpotifyTrackID={setSpotifyTrackID}
            />
          </div>
        ) : null}
        <div id="card-container">
          {APIError ? <APIErrorCard /> : null}
          {loading ? <p>Loading...</p> : null}
          {songNotFound ? <SongNotFound /> : null}
          {title !== '' ? <Menu spotifyTrackID={spotifyTrackID} /> : null}
          {title !== '' && cardState === 'songCard' ? (
            <SongCard title={title} artist={artist} />
          ) : null}
        </div>
      </div>
      <div className="grayscale w-5/6 h-screen">
        <div className=" h-screen w-50 object-contain bg-[url('https://i.pinimg.com/736x/a0/1e/5c/a01e5c1c64a0e7513bac055c016c2b2e--festival-style-festival-fashion.jpg')]"></div>
      </div>
    </div>
  )
}
