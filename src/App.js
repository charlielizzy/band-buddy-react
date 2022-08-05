import './App.css'
import { SongCard } from './Components/SongCard'
import { ArtistCard } from './Components/ArtistCard'
import { RecordingButton } from './Components/RecordingButton'
import { SongNotFound } from './Components/SongNotFound'
import { Menu } from './Components/Menu'
import React, { useState } from 'react'

function App() {
  const [title, setTitle] = useState('')
  const [album, setAlbum] = useState('')
  const [artist, setArtist] = useState('')
  const [artwork, setArtwork] = useState()
  const [songNotFound, setSongNotFound] = useState(false)
  const [cardState, setCardState] = useState('songCard')
  return (
    <body className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-screen h-screen">
      <div className="w-fit">
        <div className="tracking-wider ml-5 p-3 bg-gray-900 text-align rounded-lg text-center w-60 text-3xl text-white font-bold underline">
          <p>Band Buddy React Application</p>
        </div>
        <div className="m-5 p-3 bg-gray-900 text-align rounded-lg text-center w-60 text-3xl text-white">
          <RecordingButton
            setTitle={setTitle}
            setAlbum={setAlbum}
            setArtist={setArtist}
            setArtwork={setArtwork}
            setSongNotFound={setSongNotFound}
            setCardState={setCardState}
          />
        </div>
        <div id="card-container">
          {songNotFound ? <SongNotFound /> : null}
          {title !== '' && cardState === 'songCard' ? (
            <SongCard
              title={title}
              album={album}
              artist={artist}
              artwork={artwork}
            />
          ) : null}
          {title !== '' && cardState === 'artistCard' ? (
            <ArtistCard artist={artist} />
          ) : null}
          <Menu setCardState={setCardState} cardState={cardState} />
        </div>
      </div>
    </body>
  )
}

export default App
