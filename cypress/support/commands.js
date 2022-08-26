import { SPOTIFY_USER_DATA, ALPHABEAT_TOP_TRACKS, ALPHABEAT_TRACK_DATA, ALPHABEAT_RELATED_ARTISTS, ALPHABEAT_EVENT_DATA, SNUTS_TRACK_DATA, SNUTS_TOP_TRACKS, SNUTS_RELATED_ARTISTS, SNUTS_EVENT_DATA} from './constants';

export const setAccessToken = () => {
  cy.setCookie('accessToken',  'BQBSy5-qNSRetMTZhk3KaEXKuB7FZy5YxE6t8B9VQy7MoYW6cMMWR2D7hoTNDpZ9BwwAvI4IXl9EYVUFZzfItt2lviGHmL5oJUOQcSgq1fXkh1RJiKzHegGc2f3mI78JKHZfua4ioFVTXkfutc5UuM-99A_qxI1iCt9D97XrUnSSTmvbxXgLNU5uLHm6y4WlkD9WIZk')
}

export const mockAudioData = (artist, title, id) => {
  cy.intercept('POST', 'http://localhost:3001/audio_info', (req) => {
    req.reply({
      result: {
        title: title,
        artist: artist,
        spotify: {
          id: id,
        }
      },
    })
  }).as('fetchMockAudioData')
}

export const mockUser = () => {
  cy.intercept('GET', 'https://api.spotify.com/v1/me', (req) => {
    req.reply(SPOTIFY_USER_DATA)
  }).as('fetchUserData')
}

export const mockAlphabeatData = () => {
  cy.intercept('GET', 'https://api.spotify.com/v1/tracks/0RWolKaKzYDxm0lf8BR4co', 
  (req) => {
    req.reply(ALPHABEAT_TRACK_DATA)
  } ).as('fetchAlphabeatTrackData')
  cy.intercept(
    'GET',
    'https://api.spotify.com/v1/artists/7Defmv25Kj9knpobhHIghm/top-tracks?market=GB', (req) => {
      req.reply(ALPHABEAT_TOP_TRACKS)
    }
  ).as('fetchAlphabeatTopTracks')
  cy.intercept(
    'GET',
    'https://api.spotify.com/v1/artists/7Defmv25Kj9knpobhHIghm/related-artists', (req) => {
      req.reply(ALPHABEAT_RELATED_ARTISTS)}).as('fetchAlphabeatRelatedArtists')
      cy.intercept( 'GET',
      'https://app.ticketmaster.com/discovery/v2/events?apikey=0y3bmD7nU4GSr7rlKAPuFHbw48SeAdYn&keyword=Alphabeat&locale=*', (req) => {
        req.reply(ALPHABEAT_EVENT_DATA)}).as('fetchAlphabeatEventData')
}

export const mockSnutsData = () => {
  cy.intercept(
    'GET',
    'https://api.spotify.com/v1/tracks/6nCFIb0seIECUijbDpYNDu',
    (req) => {
      req.reply(SNUTS_TRACK_DATA)}).as('fetchTrackData')
  cy.intercept(
    'GET',
    'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo/top-tracks?market=GB',
    (req) =>
      req.reply(SNUTS_TOP_TRACKS)
  ).as('fetchTopTracksInfo')

  cy.intercept(
    'GET',
    'https://api.spotify.com/v1/artists/4AzAfQNuAyKOFG4DZMsdAo/related-artists',
    (req) => {
      req.reply(SNUTS_RELATED_ARTISTS)}
  ).as('fetchRelatedArtists')

  cy.intercept(
    'GET',
    'https://app.ticketmaster.com/discovery/v2/events?apikey=0y3bmD7nU4GSr7rlKAPuFHbw48SeAdYn&keyword=The%20Snuts&locale=*',
    (req) => {
      req.reply(SNUTS_EVENT_DATA)
    }
  ).as('fetchEventInfo')
}
