import React, { useState } from 'react'
import MicRecorder from 'mic-recorder-to-mp3'

export const RecordingButton = (props) => {
  const [recording, setRecording] = useState(false)

  const tenSecRecord = () => {
    const recorder = new MicRecorder({
      bitRate: 128,
    })

    recorder
      .start()
      .then(() => {
        props.setCardState('songCard')
        props.setArtist('')
        props.setTitle('')
        props.setSongNotFound(false)
        props.setSpotifyTrackID('')
        setRecording(true)
        props.setAPIError(false)

        setTimeout(() => {
          props.setLoading(true)
          recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
              const file = new File(buffer, 'audio-recording.mp3', {
                type: blob.type,
                lastModified: Date.now(),
              })
              const formData = new FormData()
              formData.append('file', file)
              fetch(`${process.env.REACT_APP_BAND_BUDDY_API_URL}/audio_info`, {
                method: 'post',
                body: formData,
              })
                .then(async (res) => {
                  const { result } = await res.json()
                  if (result === null) {
                    props.setSongNotFound(true)
                    props.setLoading(false)
                  } else {
                    const { artist, title } = result
                    const spotifyTrackID = result.spotify.id
                    props.setArtist(artist)
                    props.setTitle(title)
                    props.setLoading(false)
                    props.setSpotifyTrackID(spotifyTrackID)
                  }
                })
                .catch((err) => {
                  console.log('Error occurred: API fail', err)
                  props.setAPIError(true)
                  props.setLoading(false)
                })
            })
            .catch((e) => {
              alert('Recording failed')
              props.setLoading(false)
              console.log(e)
            })
          setRecording(false)
        }, 10000)
      })
      .catch((e) => {
        props.setLoading(false)
        console.error(e)
      })
    props.setLoading(false)
  }

  return (
    <div className="flex flex-col items-center w-7/8">
      <button
        data-automation="record-button"
        className="tracking-wider mb-3"
        disabled={recording}
        onClick={() => tenSecRecord()}
      >
        {recording ? (
          <div className=" items-center w-7/8">
            <p>Listening...</p>
          </div>
        ) : (
          <div className="items-center w-7/8">
            <p>Click to identify song...</p>
          </div>
        )}
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 m-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
  )
}
