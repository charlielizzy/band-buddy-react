import React, { useState } from 'react';
import {saveAs} from "file-saver";
const MicRecorder = require('mic-recorder-to-mp3');

export const RecordingButton = () => {
    const [recording, setRecording] = useState(false);
    const [filePath, setFilePath] = useState();
    const [audioPlaying, setAudioPlaying] = useState(false);

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
              // console.log("file", file)
              setFilePath(URL.createObjectURL(file));
              saveAs(URL.createObjectURL(file), "audioRecording.mp3");
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
      </div>
    )
}

