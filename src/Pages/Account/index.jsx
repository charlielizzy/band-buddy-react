import UserEventData from '../../Components/UserEventData'
import useAuth from '../../Context'
import { useNavigate } from 'react-router-dom'

export const Account = () => {
  const { userSpotifyID, logout } = useAuth()
  let navigate = useNavigate()

  if (userSpotifyID === '') {
    return null
  }
  return (
    <div data-automation="account">
      <button
        className="hover:opacity-50 tracking-wider m-3 p-3 bg-gray-900 text-align rounded-lg text-center text-xl text-white font-bold"
        data-automation="logout-button"
        onClick={() => logout()}
      >
        Log Out
      </button>
      <button
        className="hover:opacity-50 tracking-wider w-fit m-3 p-3 bg-gray-900 text-align rounded-lg text-center text-xl text-white font-bold"
        data-automation="return-to-home-button"
        onClick={() => navigate('/')}
      >
        Return to Recording
      </button>
      <UserEventData />
    </div>
  )
}
