import { mockAudioData, mockExtraInfo, mockNoShows, mockUser, setAccessToken } from '../support/commands'

describe('spotify-ticketmaster tests', () => {
  describe('artist with upcoming shows', () => {
    beforeEach(() => {
      mockUser()
      mockAudioData("The Snuts", "Glasgow", "6nCFIb0seIECUijbDpYNDu")
      mockExtraInfo()
      cy.clock()
      setAccessToken()
      cy.visit('http://localhost:3000')
      cy.wait('@fetchUserData')
      cy.get('[data-automation="record-button"]').click()
      cy.tick(11000)
      cy.wait('@fetchMockAudioData')
      cy.get('[data-automation="get-more-info"]').click()
      cy.wait('@fetchTrackData')
      cy.wait('@fetchTopTracksInfo')
      cy.wait('@fetchRelatedArtists')
      cy.wait('@fetchEventInfo')
    })

    it('should return album name', () => {
      cy.get('[data-automation="extra-info-card"]').contains('W.L. (Deluxe)')
    })
    it('should return related artist name', () => {
      cy.get('[data-automation="extra-info-card"]').contains('Viola Beach')
    })
    it('should return event info', () => {
      cy.get('[data-automation="extra-info-card"]').contains('Milano')
    })

    it('should return top tracks', () => {
      cy.get('[data-automation="extra-info-card"]').contains('Always')
    })

    it('should remove cookie when logout button is clicked', () => {
      cy.get('[data-automation="logout-button"]').click()
      cy.getCookie('accessToken').should('not.exist')
    })
    it('should show artist info when get more info button is clicked', () => {
      cy.get('[data-automation="extra-info-card"]').contains('Top Tracks')
    })
  })
})

describe('artist with no upcoming shows', () => {
  it.only('should return no upcoming shows if events is undefined', () => {
    mockUser()
    mockAudioData("Alphabeat", "Fascination", "7LKzj8BgCSn2q92Ktwk4TK")
    cy.clock()
    setAccessToken()
    mockNoShows()
    cy.visit('http://localhost:3000')
    cy.wait('@fetchUserData')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="get-more-info"]').click()
    cy.wait('@fetchAlphabeatTrackData')
    cy.wait('@fetchAlphabeatTopTracks')
    cy.wait('@fetchAlphabeatRelatedArtists')
    cy.wait('@fetchAlphabeatEventData')
    
    cy.get('[data-automation="extra-info-card"]').contains(
      'There are no upcoming shows for this artist'
    )
  })
})
