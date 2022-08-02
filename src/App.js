import './App.css'
import { RecordingButton } from './Components/RecordingButton'

function App() {
  return (
    <body className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-screen h-screen">
      <div className="text-align text-center text-3xl text-white font-bold underline">
        <p>Band Buddy React Application</p>
        <RecordingButton />
      </div>
    </body>
  )
}

export default App
