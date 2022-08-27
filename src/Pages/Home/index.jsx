import React, { useState } from 'react'
import { SongCard } from '../../Components/SongCard'
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

  console.log('isAuthenticated', isAuthenticated())
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-screen h-screen">
      <div className="tracking-wider m-3 p-3 bg-gray-900 text-align rounded-lg text-center w-60 text-xl text-white font-bold">
        <h1>Band Buddy</h1>
      </div>

      {isAuthenticated() ? (
        <button
          className="hover:opacity-50 tracking-wider m-3 p-3 bg-gray-900 text-align rounded-lg text-center text-xl text-white font-bold"
          data-automation="logout-button"
          onClick={() => logout()}
        >
          Log Out
        </button>
      ) : (
        <div>
          <p>Please sign into your Spotify account to use Band Buddy</p>
          <button
            className="hover:opacity-50 tracking-wider m-3 p-3 bg-gray-900 text-align rounded-lg text-center text-xl text-white font-bold"
            data-automation="login-button"
            onClick={() => login()}
          >
            Log In
          </button>
        </div>
      )}

      {cookies.accessToken !== undefined ? (
        <div className="m-3 p-3 bg-gray-900 text-align rounded-lg text-center w-60 text-xl text-white">
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
  )
}
