import React, { useState } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

export const RecordingButton = () => {
    const [recording, setRecording] = useState(false);
    const [filePath, setFilePath] = useState();
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [album, setAlbum] = useState("");
    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("")

    const tenSecRecord = () => {
			const recorder = new MicRecorder({
        bitRate: 128
      });

      recorder.start().then(() => {
        setRecording(true);
        setTimeout(() => {
          recorder
          .stop()
          .getMp3().then(([buffer, blob]) => {
              const file = new File(buffer, 'audio-recording.mp3', { type: blob.type, lastModified: Date.now()}); 
              setFilePath(URL.createObjectURL(file));
              const formData = new FormData(); 
              formData.append('file', file);
              fetch(`${process.env.REACT_APP_BAND_BUDDY_API_URL}/audio_info`, {
                method: 'post',
                body: formData,
              })
              .then(async (res) => {
                const { result } = await res.json();
                console.log("result", result)
                const { album, artist, title} = result;
                setAlbum(album);
                setArtist(artist);
                setTitle(title);
              })
              .catch((err) => ('Error occurred: we could not locate a song', err))
            }).catch((e) => {
              alert('We could not record your song');
              console.log(e);
            });
            setRecording(false);
        }, 10000)
      }).catch((e) => {
        console.error(e);
      });
    }

    
    const playRecordedFile = () => {
      const player = new Audio(filePath);
      player.play();
      setAudioPlaying(true);
    }

    return(
      <div>
        <button disabled={recording} onClick={() => tenSecRecord()}>{recording ? "Recording..." : "Click to start recording"}</button>
        <button disabled={audioPlaying} onClick={() => playRecordedFile()}>Play</button>
        { title !== "" ? <p>This song is called {title} and is performed by {artist} on the album {album}</p> : null}
      </div>
    )
}

