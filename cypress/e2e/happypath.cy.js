import { mockUser } from '../support/commands'

describe('happy-path', () => {
  describe('recording button status', () => {
    beforeEach(() => {
      mockUser()
      cy.setCookie(
        'accessToken',
        'BQC5CHoBV44kZ6UHqNqG-xr_ZCF5kSjyjMWLLg49DXjaefrdkJjAXcd9bIixal716tuTahvywvwSIxYnH0bkSE7BDli9c57DcSco2iL2E3wBuHbAoniODOaLOs-K5YqDMq9EFIKow6KIG_Uv1NgYG6Lf2UogNv14YLanQCeSCXoE_XcFdGo2YYCEFjYg9Xy0Qvexelo'
      )
      cy.clock()
      cy.visit('http://localhost:3000')
      cy.wait('@fetchUserData')
      cy.get('[data-automation="record-button"]').click()
    })
    it('text in button should change to recording once clicked', () => {
      cy.get('[data-automation="record-button"]').contains('Recording...')
    })

    it('after 10 seconds text should change back', () => {
      cy.get('[data-automation="record-button"]').contains('Recording...')
      cy.tick(11000)
      cy.get('[data-automation="record-button"]').contains('Click')
    })

    it('record button should be disabled after one click', () => {
      cy.get('[data-automation="record-button"]').should('be.disabled')
    })

    it('record button should be reenabled after 10 seconds of being disabled', () => {
      cy.get('[data-automation="record-button"]').should('be.disabled')
      cy.tick(11000)
      cy.get('[data-automation="record-button"]').should('not.be.disabled')
    })
  })

  it('should return song name, artist and album', () => {
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
    cy.setCookie(
      'accessToken',
      'BQC5CHoBV44kZ6UHqNqG-xr_ZCF5kSjyjMWLLg49DXjaefrdkJjAXcd9bIixal716tuTahvywvwSIxYnH0bkSE7BDli9c57DcSco2iL2E3wBuHbAoniODOaLOs-K5YqDMq9EFIKow6KIG_Uv1NgYG6Lf2UogNv14YLanQCeSCXoE_XcFdGo2YYCEFjYg9Xy0Qvexelo'
    )
    cy.visit('http://localhost:3000')
    cy.wait('@fetchUserData')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
    cy.get('[data-automation="songCard"]').contains(" I Think We're Alone Now")
  })

  it('should return songNotFound if result is equal to null', () => {
    mockUser()
    cy.intercept('POST', 'http://localhost:3001/audio_info', (req) => {
      req.reply({
        result: null,
      })
    }).as('fetchAudioData')
    cy.clock()
    cy.setCookie(
      'accessToken',
      'BQC5CHoBV44kZ6UHqNqG-xr_ZCF5kSjyjMWLLg49DXjaefrdkJjAXcd9bIixal716tuTahvywvwSIxYnH0bkSE7BDli9c57DcSco2iL2E3wBuHbAoniODOaLOs-K5YqDMq9EFIKow6KIG_Uv1NgYG6Lf2UogNv14YLanQCeSCXoE_XcFdGo2YYCEFjYg9Xy0Qvexelo'
    )
    cy.visit('http://localhost:3000')
    cy.wait('@fetchUserData')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
    cy.get('[data-automation="songNotFound"]').contains(
      'We were unable to identify your song. Please try again'
    )
  })

  it('should not allow you to record if there is no cookie', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-automation="record-button"]').should('not.exist')
  })

  it('should remove cookie when logout button is clicked on homepage', () => {
    mockUser()
    cy.setCookie(
      'accessToken',
      'BQC5CHoBV44kZ6UHqNqG-xr_ZCF5kSjyjMWLLg49DXjaefrdkJjAXcd9bIixal716tuTahvywvwSIxYnH0bkSE7BDli9c57DcSco2iL2E3wBuHbAoniODOaLOs-K5YqDMq9EFIKow6KIG_Uv1NgYG6Lf2UogNv14YLanQCeSCXoE_XcFdGo2YYCEFjYg9Xy0Qvexelo'
    )
    cy.clock()
    cy.visit('http://localhost:3000')
    cy.wait('@fetchUserData')
    cy.get('[data-automation="logout-button"]').click()
    cy.getCookie('accessToken').should('not.exist')
  })
})
