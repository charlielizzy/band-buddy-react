import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExtraInfoCard } from '../../Components/ExtraInfoCard'
import useAuth from '../../Context'

export default function Spotify() {
  const [data, setData] = useState(null)
  const { accessToken } = useAuth()
  let { spotifyTrackID } = useParams()

  useEffect(() => {
    getTrackInfo()
  }, [])

  const getTrackInfo = async () => {
    const results = await fetch(
      `https://api.spotify.com/v1/tracks/${spotifyTrackID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await results.json()

    setData({
      trackName: data.name,
      albumName: data.album.name,
      artistName: data.artists[0].name,
      albumArt: data.album.images[0].url,
    })
    getTopTracks(data.artists[0].id)
  }

  const getTopTracks = async (artistID) => {
    const results = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=GB`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await results.json()
    console.log('data', data)
  }

  return (
    <div>
      {data ? (
        <ExtraInfoCard
          trackName={data.trackName}
          artistName={data.artistName}
          albumName={data.albumName}
          albumArt={data.albumArt}
        />
      ) : null}
    </div>
  )
}
