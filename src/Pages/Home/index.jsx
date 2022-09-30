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

  const { login, isAuthenticated, logout, spotifyUser } = useAuth()

  let navigate = useNavigate()

  const [spotifyTrackID, setSpotifyTrackID] = useState('')

  return (
    <div className="grid overflow-scroll grid-cols-2 grid-rows-1 gap-2 bg-gray-900">
      <div className="flex flex-col h-screen">
        <div className="flex flex-col items-center w-7/8 tracking-wider text-align rounded-lg text-center text-9xl text-white font-bold">
          <br />
          <h1>BAND BUDDY</h1>
          <br />
        </div>
        <div className="flex flex-col items-center w-7/8">
          {isAuthenticated() ? (
            <div>
              <button
                className="border-2 hover:opacity-50 tracking-wider m-5 p-3 bg-gray-900 text-align rounded-lg text-center text-3xl text-white font-bold"
                data-automation="logout-button"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center w-7/8">
              <div>
                <p className="m-5 bg-gray-900 text-align rounded-lg text-3xl text-white">
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
        <div className="flex flex-col items-center w-7/8">
          {cookies.accessToken !== undefined ? (
            <div className="flex flex-col items-center m-5 p-3 bg-gray-900 text-align rounded-lg text-center w-60 text-3xl text-white">
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

            {title !== '' && cardState === 'songCard' ? (
              <SongCard title={title} artist={artist} />
            ) : null}
            {isAuthenticated() && title !== '' ? (
              <div className="border-2 hover:opacity-50 tracking-wider m-5 p-3 bg-gray-900 text-align rounded-lg text-center text-3xl text-white font-bold">
                {title !== '' ? <Menu spotifyTrackID={spotifyTrackID} /> : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="grayscale object-contain flex flex-col h-screen">
        <div className="h-screen object-contain bg-[url('https://cdn.theatlantic.com/thumbor/MGTRsI9SmWEu_Gxa8cIkC_zhp4Q=/719x0:2125x1406/1080x1080/media/img/mt/2022/04/Code_Orange_Friday_04_22_Performances_Sonora_Weekend_2/original.jpg')]"></div>
      </div>
    </div>
  )
}
