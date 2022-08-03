import './App.css'
import { SongCard } from './Components/SongCard'
import { RecordingButton } from './Components/RecordingButton'

function App() {
  return (
    <body className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-screen h-screen">
      <div className="w-fit">
        <div className="tracking-wider ml-5 p-3 bg-gray-900 text-align rounded-lg text-center w-60 text-3xl text-white font-bold underline">
          <p>Band Buddy React Application</p>
        </div>
        <div className="m-5 p-3 bg-gray-900 text-align rounded-lg text-center w-60 text-3xl text-white">
          <RecordingButton />
        </div>
        <div className="tracking-widest m-5 p-3 h-60 bg-gray-900 rounded-lg w-60 text-3xl text-white">
          <SongCard />
        </div>
      </div>
    </body>
  )
}

export default App
