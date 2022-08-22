import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExtraInfoCard } from '../../Components/ExtraInfoCard'
import useAuth from '../../Context'

export default function Spotify() {
  const [data, setData] = useState(null)
  const [topTracks, setTopTracks] = useState(null)
  const [relatedArtists, setRelatedArtists] = useState(null)
  const [events, setEvents] = useState(null)
  const [loading, setLoading] = useState(true)
  const [artistID, setArtistID] = useState()
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
    getRelatedArtists(data.artists[0].id)
    setArtistID(data.artists[0].id)
    getArtistEvents(data.artists[0].name)
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
    setTopTracks([
      { name: data.tracks[0].name, url: data.tracks[0].external_urls.spotify },
      { name: data.tracks[1].name, url: data.tracks[1].external_urls.spotify },
      { name: data.tracks[2].name, url: data.tracks[2].external_urls.spotify },
      { name: data.tracks[3].name, url: data.tracks[3].external_urls.spotify },
      { name: data.tracks[4].name, url: data.tracks[4].external_urls.spotify },
    ])
  }

  const getRelatedArtists = async (artistID) => {
    const results = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await results.json()
    console.log('relatedArtists', relatedArtists)
    setRelatedArtists([
      {
        name: data.artists[0].name,
        url: data.artists[0].external_urls.spotify,
      },
      {
        name: data.artists[1].name,
        url: data.artists[1].external_urls.spotify,
      },
      {
        name: data.artists[2].name,
        url: data.artists[2].external_urls.spotify,
      },
      {
        name: data.artists[3].name,
        url: data.artists[3].external_urls.spotify,
      },
      {
        name: data.artists[4].name,
        url: data.artists[4].external_urls.spotify,
      },
    ])
  }

  const getArtistEvents = async (artistName) => {
    // console.log('artistName', artistName)
    const results = await fetch(
      // `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}&keyword=${artistName}&locale=*`
      `https://app.ticketmaster.com/discovery/v2/events?apikey=0y3bmD7nU4GSr7rlKAPuFHbw48SeAdYn&keyword=${artistName}&locale=*`
    )
    const eventData = await results.json()
    if (eventData._embedded !== undefined) {
      setEvents([
        {
          name: eventData._embedded.events[0].name,
          city: eventData._embedded.events[0]._embedded.venues[0].city.name,
          date: eventData._embedded.events[0].dates.start.localDate,
          url: eventData._embedded.events[0].url,
        },
        {
          name: eventData._embedded.events[1].name,
          city: eventData._embedded.events[1]._embedded.venues[0].city.name,
          date: eventData._embedded.events[1].dates.start.localDate,
          url: eventData._embedded.events[1].url,
        },
        {
          name: eventData._embedded.events[2].name,
          city: eventData._embedded.events[2]._embedded.venues[0].city.name,
          date: eventData._embedded.events[2].dates.start.localDate,
          url: eventData._embedded.events[2].url,
        },
        {
          name: eventData._embedded.events[3].name,
          city: eventData._embedded.events[3]._embedded.venues[0].city.name,
          date: eventData._embedded.events[3].dates.start.localDate,
          url: eventData._embedded.events[3].url,
        },
        {
          name: eventData._embedded.events[4].name,
          city: eventData._embedded.events[4]._embedded.venues[0].city.name,
          date: eventData._embedded.events[4].dates.start.localDate,
          url: eventData._embedded.events[4].url,
        },
      ])
    }

    setLoading(false)
    console.log('events', events)
  }

  // if (data !== null && topTracks !== null && relatedArtists !== null) {
  //   setLoading(false)
  // }

  return (
    <div>
      {/* {data && topTracks && relatedArtists && events ? (
        <ExtraInfoCard
          trackName={data.trackName}
          artistName={data.artistName}
          albumName={data.albumName}
          albumArt={data.albumArt}
          topTracks={topTracks}
          relatedArtists={relatedArtists}
          artistID={artistID}
          events={events}
        />
      ) : null} */}
      {loading ? null : (
        <ExtraInfoCard
          trackName={data.trackName}
          artistName={data.artistName}
          albumName={data.albumName}
          albumArt={data.albumArt}
          topTracks={topTracks}
          relatedArtists={relatedArtists}
          artistID={artistID}
          events={events}
        />
      )}
    </div>
  )
}
