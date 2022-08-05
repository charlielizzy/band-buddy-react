import React, { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

export const RecordingButton = (props) => {
    const [recording, setRecording] = useState(false);

    const tenSecRecord = () => {
			const recorder = new MicRecorder({
        bitRate: 128
      });

      recorder.start().then(() => {
        props.setCardState("songCard");
        props.setAlbum("");
        props.setArtist("");
        props.setTitle("");
        props.setArtwork("");
        props.setSongNotFound(false);
        // props.setSpotifyID("")
        setRecording(true);

        setTimeout(() => {
          recorder
          .stop()
          .getMp3().then(([buffer, blob]) => {
              const file = new File(buffer, 'audio-recording.mp3', { type: blob.type, lastModified: Date.now()}); 
              const formData = new FormData(); 
              formData.append('file', file);
               fetch(`${process.env.REACT_APP_BAND_BUDDY_API_URL}/audio_info`, {
                method: 'post',
                body: formData,
              })
              .then(async (res) => {
                const { result } = await res.json();
                console.log("result", result)
                if (result === null) {
                  props.setSongNotFound(true)
                } else {
                  const { album, artist, title, } = result;
                  const artwork = result.spotify.album.images[0].url;
                  // const spotifyID = result.spotify.artists[0].id;
                  props.setAlbum(album);
                  props.setArtist(artist);
                  props.setTitle(title);
                  props.setArtwork(artwork)   
                  // props.setSpotifyID(spotifyID)             
                }
              })
              .catch((err) => {console.log('Error occurred: API fail', err); return (
                <h1 data-automation="apiCall">API fail</h1>
              )})
            }).catch((e) => {
              alert('Recordimg failed');
              console.log(e);
            });
            setRecording(false);
        }, 10000)
      }).catch((e) => {
        console.error(e);
      });
    }

    return(
      <div>
        <button data-automation="record-button" className="tracking-wider"disabled={recording} onClick={() => tenSecRecord()}>{recording ? "Recording..." : "Click to start recording"}</button>

      </div>
    )
}

