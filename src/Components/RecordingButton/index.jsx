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
        props.setAPIError(false);

        setTimeout(() => {
          props.setLoading(true)
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
                  props.setLoading(false)
                } else {
                  const { album, artist, title, } = result;
                  const artwork = result.spotify.album.images[0].url;
                  // const spotifyID = result.spotify.artists[0].id;
                  props.setAlbum(album);
                  props.setArtist(artist);
                  props.setTitle(title);
                  props.setArtwork(artwork)
                  props.setLoading(false)   
                  // props.setSpotifyID(spotifyID)             
                }

              })
              .catch((err) => {
                console.log('Error occurred: API fail', err); 
                props.setAPIError(true)
                props.setLoading(false)   
              })
            }).catch((e) => {
              alert('Recording failed');
              props.setLoading(false)   
              console.log(e);
            });
            setRecording(false);
        }, 10000)
      }).catch((e) => {
        props.setLoading(false)   
        console.error(e);
      });
    }

    return(
      <div>
        <button data-automation="record-button" className="tracking-wider"disabled={recording} onClick={() => tenSecRecord()}>{recording ? "Recording..." : "Click to start recording"}</button>

      </div>
    )
}

