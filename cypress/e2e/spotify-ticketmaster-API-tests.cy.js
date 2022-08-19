describe('spotify-ticketmaster tests', () => {
  describe('artist with upcoming shows', () => {
    beforeEach(() => {
      cy.intercept('POST', 'http://localhost:3001/audio_info', (req) => {
        req.reply({
          result: {
            title: 'Glasgow',
            artist: 'The Snuts',
          },
        })
      }).as('fetchAudioData')
      cy.clock()
      cy.setCookie(
        'accessToken',
        'BQC5CHoBV44kZ6UHqNqG-xr_ZCF5kSjyjMWLLg49DXjaefrdkJjAXcd9bIixal716tuTahvywvwSIxYnH0bkSE7BDli9c57DcSco2iL2E3wBuHbAoniODOaLOs-K5YqDMq9EFIKow6KIG_Uv1NgYG6Lf2UogNv14YLanQCeSCXoE_XcFdGo2YYCEFjYg9Xy0Qvexelo'
      )
      cy.visit('http://localhost:3000')
      cy.get('[data-automation="record-button"]').click()
      cy.tick(11000)
      cy.intercept('GET', 'http://localhost:3001/track/:id', (req) => {
        req.reply({
          result: {
            albumArt:
              'https://i.scdn.co/image/ab67616d0000b273214a0b7b069dd7557ba7910e',
            artistName: 'The Snuts',
            trackName: 'Glasgow',
            albumName: 'W.L. Deluxe',
            topTracks: {
              url: 'https://open.spotify.com/track/0RWolKaKzYDxm0lf8BR4co',
              name: 'Somebody Loves You',
            },
            relatedArtists: {
              name: 'Viola Beach',
              url: 'https://open.spotify.com/artist/7DruTvBV7owt1aSAZHsU58',
            },
            artistID: '4AzAfQNuAyKOFG4DZMsdAo',
            events: {
              url: 'https://shop.ticketmaster.it/biglietti/acquista-biglietti-the-snuts.html',
              name: 'The Snuts',
              city: 'Milano',
              date: '2022-09-16',
            },
          },
        })
      }).as('fetchSpotifyData')
      cy.get('[data-automation="get-more-info"]').click()
    })

    it('should return album name', () => {
      cy.wait('@fetchSpotifyData')
      cy.get('[data-automation="get-more-info"]').contains('W.L. Deluxe')
    })
    it('should return related artist name', () => {
      cy.wait('@fetchSpotifyData')
      cy.get('[data-automation="get-more-info"]').contains('Viola Beach')
    })
    it('should return event info', () => {
      cy.wait('@fetchSpotifyData')
      cy.get('[data-automation="get-more-info"]').contains('Milano')
    })

    it('should return top tracks', () => {
      cy.wait('@fetchSpotifyData')
      cy.get('[data-automation="get-more-info"]').contains('Somebody Loves You')
    })

    it('should remove cookie when logout button is clicked', () => {
      cy.get('[data-automation="logout-button"]').click()
      cy.getCookie('accessToken').should('not.exist')
    })
  })
})

describe('artist with no upcoming shows', () => {
  it('should return no upcoming shows if events is undefined', () => {
    cy.intercept('POST', 'http://localhost:3001/audio_info', (req) => {
      req.reply({
        result: {
          title: 'Fascination',
          artist: 'Alphabeat',
        },
      })
    }).as('fetchAudioData')
    cy.clock()
    cy.setCookie(
      'accessToken',
      'BQC5CHoBV44kZ6UHqNqG-xr_ZCF5kSjyjMWLLg49DXjaefrdkJjAXcd9bIixal716tuTahvywvwSIxYnH0bkSE7BDli9c57DcSco2iL2E3wBuHbAoniODOaLOs-K5YqDMq9EFIKow6KIG_Uv1NgYG6Lf2UogNv14YLanQCeSCXoE_XcFdGo2YYCEFjYg9Xy0Qvexelo'
    )
    cy.visit('http://localhost:3000')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
    cy.intercept('GET', 'http://localhost:3001/track/:id', (req) => {
      req.reply({
        result: {
          albumArt:
            'https://i.scdn.co/image/ab67616d0000b273214a0b7b069dd7557ba7910e',
          artistName: 'Alphabeat',
          trackName: 'Fascination',
          albumName: 'Housework Hits 2',
          topTracks: {
            url: 'https://open.spotify.com/track/0JEeqTbdMFLgIeS3iFysse',
            name: 'The Spell',
          },
          relatedArtists: {
            name: 'Infernal',
            url: 'https://open.spotify.com/artist/2nnBn2iyqkuOBj85nhGp1k',
          },
          artistID: '7Defmv25Kj9knpobhHIghm',
          events: null,
        },
      })
    }).as('fetchSpotifyData')
    cy.get('[data-automation="get-more-info"]').click()
    cy.get('[data-automation="get-more-info"]').contains(
      'There are no upcoming shows for this artist'
    )
  })
})
