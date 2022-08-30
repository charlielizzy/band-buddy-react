import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExtraInfo } from '../../Components/ExtraInfo'
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

  useEffect(() => {
    if (data && topTracks && relatedArtists && events) {
      setLoading(false)
    }
  }, [data, topTracks, relatedArtists, events])

  const getTrackInfo = async () => {
    try {
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
    } catch (error) {
      console.log('spotify get track info request failed')
    }
  }

  const getTopTracks = async (artistID) => {
    try {
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
      setTopTracks([
        {
          name: data.tracks[0].name,
          url: data.tracks[0].external_urls.spotify,
        },
        {
          name: data.tracks[1].name,
          url: data.tracks[1].external_urls.spotify,
        },
        {
          name: data.tracks[2].name,
          url: data.tracks[2].external_urls.spotify,
        },
        {
          name: data.tracks[3].name,
          url: data.tracks[3].external_urls.spotify,
        },
        {
          name: data.tracks[4].name,
          url: data.tracks[4].external_urls.spotify,
        },
      ])
    } catch (error) {
      console.log('spotify get top tracks request failed')
    }
  }

  const getRelatedArtists = async (artistID) => {
    try {
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
    } catch (error) {
      console.log('spotify get related artists request failed')
    }
  }

  const getArtistEvents = async (artistName) => {
    try {
      const results = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}&keyword=${artistName}&locale=*`
      )
      const eventData = await results.json()
      console.log('eventData', eventData)
      if (eventData._embedded !== undefined) {
        setEvents([
          {
            eventID: eventData._embedded.events[0].id,
            name: eventData._embedded.events[0].name,
            city: eventData._embedded.events[0]._embedded.venues[0].city.name,
            date: eventData._embedded.events[0].dates.start.localDate,
            url: eventData._embedded.events[0].url,
            coordinates:
              eventData._embedded.events[0]._embedded.venues[0].location,
          },
          {
            eventID: eventData._embedded.events[1].id,
            name: eventData._embedded.events[1].name,
            city: eventData._embedded.events[1]._embedded.venues[0].city.name,
            date: eventData._embedded.events[1].dates.start.localDate,
            url: eventData._embedded.events[1].url,
            coordinates:
              eventData._embedded.events[1]._embedded.venues[0].location,
          },
          {
            eventID: eventData._embedded.events[2].id,
            name: eventData._embedded.events[2].name,
            city: eventData._embedded.events[2]._embedded.venues[0].city.name,
            date: eventData._embedded.events[2].dates.start.localDate,
            url: eventData._embedded.events[2].url,
            coordinates:
              eventData._embedded.events[2]._embedded.venues[0].location,
          },
          {
            eventID: eventData._embedded.events[3].id,
            name: eventData._embedded.events[3].name,
            city: eventData._embedded.events[3]._embedded.venues[0].city.name,
            date: eventData._embedded.events[3].dates.start.localDate,
            url: eventData._embedded.events[3].url,
            coordinates:
              eventData._embedded.events[3]._embedded.venues[0].location,
          },
          {
            eventID: eventData._embedded.events[4].id,
            name: eventData._embedded.events[4].name,
            city: eventData._embedded.events[4]._embedded.venues[0].city.name,
            date: eventData._embedded.events[4].dates.start.localDate,
            url: eventData._embedded.events[4].url,
            coordinates:
              eventData._embedded.events[4]._embedded.venues[0].location,
          },
        ])
        // console.log('events', events)
      } else {
        setEvents([])
      }
    } catch (error) {
      console.log('ticketmaster get artist events request failed')
    }
  }

  return (
    <div>
      {loading ? null : (
        <ExtraInfo
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
