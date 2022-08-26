import { mockUser, setAccessToken } from '../support/commands'

describe('happy-path', () => {
  describe('intial setup of app when loaded', () => {
    beforeEach(() => {
      mockUser()
      setAccessToken()
      cy.visit('http://localhost:3000')
      cy.wait('@fetchUserData')
      cy.clock()
    })

    it('text in button should change to recording once clicked', () => {
      cy.get('[data-automation="record-button"]').click()
      cy.get('[data-automation="record-button"]').contains('Recording...')
    })

    it('should not show any cards or menu before recording button is clicked', () => {
      cy.get('[data-automation="songCard"]').should('not.exist')
      cy.get('[data-automation="songNotFoundCard"]').should('not.exist')
      cy.get('[data-automation="menuBar"]').should('not.exist')
    })

    it('after 10 seconds text should change back', () => {
      cy.get('[data-automation="record-button"]').click()
      cy.get('[data-automation="record-button"]').contains('Recording...')
      cy.tick(11000)
      cy.get('[data-automation="record-button"]').contains('Click')
    })

    it('record button should be disabled after one click', () => {
      cy.get('[data-automation="record-button"]').click()
      cy.get('[data-automation="record-button"]').should('be.disabled')
    })
    it('record button should be reenabled after 10 seconds of being disabled', () => {
      cy.get('[data-automation="record-button"]').click()
      cy.get('[data-automation="record-button"]').should('be.disabled')
      cy.tick(11000)
      cy.get('[data-automation="record-button"]').should('not.be.disabled')
    })
  })
})

describe('song not found', () => {
  it('should return songNotFound if result is equal to null and menuBar should not be visible', () => {
    mockUser()
    setAccessToken()
    cy.visit('http://localhost:3000')
    cy.wait('@fetchUserData')
    cy.clock()
    cy.intercept('POST', 'http://localhost:3001/audio_info', (req) => {
      req.reply({
        result: null,
      })
    }).as('fetchAudioData')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songNotFound"]').contains(
      'We were unable to identify your song. Please try again'
    )
    cy.get('[data-automation="menuBar"]').should('not.exist')
  })
})

describe('API SUCCESS', () => {
  beforeEach(() => {
    mockUser()
    cy.intercept('POST', 'http://localhost:3001/audio_info', (req) => {
      req.reply({
        result: {
          title: "I Think We're Alone Now",
          artist: 'Tiffany',
          album: 'Best Pride Music',
          spotify: {
            album: {
              images: [
                {
                  url: 'https://i.scdn.co/image/ab67616d0000b273389fee741b183fc3df0fbf64',
                },
              ],
            },
          },
        },
      })
    }).as('fetchAudioData')
    cy.clock()
    setAccessToken()
    cy.visit('http://localhost:3000')
    cy.wait('@fetchUserData')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
  })

  it('should return song name, artist and album', () => {
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songCard"]').contains("I Think We're Alone Now")
  })

  it('should only show either songCard or songNotFoundCard', () => {
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songCard"]').contains(" I Think We're Alone Now")
    cy.get('[data-automation="songNotFoundCard"]').should('not.exist')
  })

  it('should clear card when recording button is pressed again', () => {
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songCard"]').contains(" I Think We're Alone Now")
    cy.get('[data-automation="record-button"]').click()
    cy.get('[data-automation="songCard"]').should('not.exist')
    cy.get('[data-automation="songNotFoundCard"]').should('not.exist')
  })

  it('should clear song card if next song is not found', () => {
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songCard"]').contains(" I Think We're Alone Now")
    cy.intercept('POST', 'http://localhost:3001/audio_info', (req) => {
      req.reply({
        result: null,
      })
    }).as('fetchAudioData')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songCard"]').should('not.exist')
    cy.get('[data-automation="songNotFoundCard"]').should('not.exist')
    cy.tick(11000)

    cy.get('[data-automation="songNotFound"]').should('exist')
  })
})

describe('API FAILURE', () => {
  it('should return an error message if the API call is unsuccessful', () => {
    mockUser()
    cy.clock()
    cy.intercept('POST', 'http://localhost:3001/audio_info', {
      statusCode: 500,
    }).as('fetchAudioData')
    setAccessToken()
    cy.visit('http://localhost:3000')
    cy.wait('@fetchUserData')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="apiError"]').should('exist')
  })
})
