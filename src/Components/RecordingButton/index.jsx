import React, { useState } from 'react';
const MicRecorder = require('mic-recorder-to-mp3');

export const RecordingButton = () => {
    const [recording, setRecording] = useState(false);
    const [filePath, setFilePath] = useState();

    let file;
    // let player;
    const recorder = new MicRecorder({
        bitRate: 128
      });

    const tenSecRecord =  () => {
        recorder.start().then(() => {
            setRecording(true);
              }).catch((e) => {
                console.error(e);
              });
        setTimeout(() => {
                recorder
                .stop()
                .getMp3().then(([buffer, blob]) => {
                   file = new File(buffer, 'audio-recording.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                  }); 
                // player = new Audio(URL.createObjectURL(file));
                setFilePath(URL.createObjectURL(file));

                //   player.play();
                 
                }).catch((e) => {
                  alert('We could not record your song');
                  console.log(e);
                });
                    setRecording(false);
                  }, 10000)
        
            }
    console.log("recording", recording)
    
    const playRecordedFile = () => {
        const player = new Audio(filePath);
        player.play();
    }

    return(
        <div>
            <button disabled={recording} onClick={() => tenSecRecord()}>{recording ? <p>Recording...</p> : <p>Click to start recording</p>}</button>
            <button onClick={() => playRecordedFile()}>Play</button>
        </div>
    )
}

