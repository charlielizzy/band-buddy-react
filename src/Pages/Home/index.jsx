import React, { useState } from 'react'
import { SongCard } from '../../Components/SongCard'
import { ArtistCard } from '../../Components/ArtistCard'
import { GigCard } from '../../Components/GigCard'
import { APIErrorCard } from '../../Components/APIError'
import { RecordingButton } from '../../Components/RecordingButton'
import { SongNotFound } from '../../Components/SongNotFound'
import { Menu } from '../../Components/Menu'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

// import AuthCallback  from '../AuthCallback'

export default function Home() {
  const [title, setTitle] = useState('')
  const [album, setAlbum] = useState('')
  const [artist, setArtist] = useState('')
  const [artwork, setArtwork] = useState()
  const [songNotFound, setSongNotFound] = useState(false)
  const [cardState, setCardState] = useState('songCard')
  const [APIError, setAPIError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"])
  let navigate = useNavigate();

  // const [spotifyArtistID, setSpotifyArtistID] = useState("")
   // const [spotifyTrackID, setSpotifyTrackID] = useState("")

const handleRemoveCookie = () => {
removeCookie('accessToken', {
  path: "/"
  
})
navigate('/')
}

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-screen h-screen">
      
     <button
        className="hover:opacity-50 bg-white p-1 rounded-lg z-10"
        id="logout-button"
        onClick={handleRemoveCookie}
      >
        Log Out
      </button> 
      <a
        href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&scope=user-read-private%20user-read-email%20user-top-read`}
        className="hover:opacity-50 bg-white p-1 rounded-lg z-10"
        data-automation="login-button"
      >
        Log In
      </a> 

      <div className="tracking-wider m-5 p-3 bg-gray-900 text-align rounded-lg text-center w-60 text-3xl text-white font-bold">
        <p>Band Buddy React Application</p>
      </div>
      { cookies.accessToken !== undefined ? <div className="m-5 p-3 bg-gray-900 text-align rounded-lg text-center w-60 text-3xl text-white">
        <RecordingButton
          setTitle={setTitle}
          setAlbum={setAlbum}
          setArtist={setArtist}
          setArtwork={setArtwork}
          setSongNotFound={setSongNotFound}
          setCardState={setCardState}
          setAPIError={setAPIError}
          setLoading={setLoading}
          loading={loading}
          // setSpotifyArtistID={setSpotifyArtistID}
          // setSpotifyTrackID={setSpotifyTrackID}
        />
      </div> : null}
      <div id="card-container">
        {APIError ? <APIErrorCard /> : null}
        {loading ? <p >Loading...</p> : null}
        {songNotFound ? <SongNotFound /> : null}
        {title !== '' ? (
          <Menu setCardState={setCardState} cardState={cardState} />
        ) : null}
        {title !== '' && cardState === 'songCard' ? (
          <SongCard
            title={title}
            album={album}
            artist={artist}
            artwork={artwork}
          />
        ) : null}

        {title !== '' && cardState === 'artistCard' ? (
          <ArtistCard
            artist={artist}
            // spotifyArtistID={spotifyArtistID}
            // spotifyTrackID={spotifyTrackID}
          />
        ) : null}

        {title !== '' && cardState === 'gigCard' ? (
          <GigCard artist={artist} />
        ) : null}
      </div>
    </div>
  )
}