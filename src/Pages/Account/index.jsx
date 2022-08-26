import UserEventData from '../../Components/UserEventData'
import useAuth from '../../Context'

export const Account = () => {
  const { userSpotifyID } = useAuth()

  return <UserEventData />
}