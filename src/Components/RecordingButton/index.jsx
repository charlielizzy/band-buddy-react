import React, { useState } from 'react';
const MicRecorder = require('mic-recorder-to-mp3');

export const RecordingButton = () => {
    const [recording, setRecording] = useState(false)

    let player;
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
                  const file = new File(buffer, 'me-at-thevoice.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                  });
                 
                    player = new Audio(URL.createObjectURL(file));
                  player.play();
                 
                }).catch((e) => {
                  alert('We could not retrieve your message');
                  console.log(e);
                });
                    setRecording(false);
                  }, 10000)
        
            }
    console.log("recording", recording)
    
    // const playRecordedFile = () => {
    //     player.play();
    // }

    return(
        <div>
            <button onClick={() => tenSecRecord()}>{recording ? <p>Recording...</p> : <p>Click to start recording</p>}</button>
            {/* <button onClick={() => playRecordedFile()}>Play</button> */}
        </div>
    )
}

