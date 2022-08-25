import { SPOTIFY_USER_DATA, ALPHABEAT_TOP_TRACKS, ALPHABEAT_TRACK_DATA, ALPHABEAT_RELATED_ARTISTS, ALPHABEAT_EVENT_DATA, SNUTS_TRACK_DATA, SNUTS_TOP_TRACKS, SNUTS_RELATED_ARTISTS, SNUTS_EVENT_DATA} from './constants';

export const setAccessToken = () => {
  cy.setCookie('accessToken',
  'BQC5CHoBV44kZ6UHqNqG-xr_ZCF5kSjyjMWLLg49DXjaefrdkJjAXcd9bIixal716tuTahvywvwSIxYnH0bkSE7BDli9c57DcSco2iL2E3wBuHbAoniODOaLOs-K5YqDMq9EFIKow6KIG_Uv1NgYG6Lf2UogNv14YLanQCeSCXoE_XcFdGo2YYCEFjYg9Xy0Qvexelo')
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

export const mockNoShows = () => {
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

export const mockExtraInfo = () => {
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
