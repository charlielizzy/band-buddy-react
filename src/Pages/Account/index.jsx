import UserEventData from '../../Components/UserEventData'
import useAuth from '../../Context'

export const Account = () => {
  const { userSpotifyID, logout } = useAuth()

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
      <UserEventData />
    </div>
  )
}
