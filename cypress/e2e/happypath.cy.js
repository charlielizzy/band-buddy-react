describe('happy-path', () => {
  it('text in button should change to recording once clicked', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-automation="record-button"]').click()
    cy.get('[data-automation="record-button"]').contains('Recording...')
  })
  it('after 10 seconds text should change back', () => {
    cy.clock()
    cy.visit('http://localhost:3000')
    cy.get('[data-automation="record-button"]').click()
    cy.get('[data-automation="record-button"]').contains('Recording...')
    cy.tick(11000)
    cy.get('[data-automation="record-button"]').contains('Click')
  })
  it('record button should be disabled after one click', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-automation="record-button"]').click()
    cy.get('[data-automation="record-button"]').should('be.disabled')
  })
  it('record button should be reenabled after 10 seconds of being disabled', () => {
    cy.clock()
    cy.visit('http://localhost:3000')
    cy.get('[data-automation="record-button"]').click()
    cy.get('[data-automation="record-button"]').should('be.disabled')
    cy.tick(11000)
    cy.get('[data-automation="record-button"]').should('not.be.disabled')
  })
  it('should return song name, artist and album', () => {
    cy.clock()
    cy.visit('http://localhost:3000')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
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
                  url: 'https://i.scdn.co/image/ab67616d0000b27345ec2531f00be5f33074d858',
                },
              ],
            },
          },
        },
      })
    }).as('fetchAudioData')
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songCard"]').contains(" I Think We're Alone Now")
  })
  it.only('should return songNotFound if result is equal to null', () => {
    cy.clock()
    cy.visit('http://localhost:3000')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
    cy.intercept('POST', 'http://localhost:3001/audio_info', (req) => {
      req.reply({
        result: null,
      })
    }).as('fetchAudioData')
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songNotFound"]').contains(
      'We were unable to identify your song. Please try again'
    )
  })
  it('should only show either songCard or songNotFoundCard', () => {
    cy.clock()
    cy.visit('http://localhost:3000')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
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
                  url: 'https://i.scdn.co/image/ab67616d0000b27345ec2531f00be5f33074d858',
                },
              ],
            },
          },
        },
      })
    }).as('fetchAudioData')
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songCard"]').contains(" I Think We're Alone Now")
    cy.get('[data-automation="songNotFoundCard"]').should('not.exist')
  })
  it('should clear card when recording button is pressed again', () => {
    cy.clock()
    cy.visit('http://localhost:3000')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
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
                  url: 'https://i.scdn.co/image/ab67616d0000b27345ec2531f00be5f33074d858',
                },
              ],
            },
          },
        },
      })
    }).as('fetchAudioData')
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songCard"]').contains(" I Think We're Alone Now")
    cy.get('[data-automation="record-button"]').click()
    cy.get('[data-automation="songCard"]').should('not.exist')
    cy.get('[data-automation="songNotFoundCard"]').should('not.exist')
  })
  it('should clear song card if next song is not found', () => {
    cy.clock()
    cy.visit('http://localhost:3000')
    cy.get('[data-automation="record-button"]').click()
    cy.tick(11000)
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
                  url: 'https://i.scdn.co/image/ab67616d0000b27345ec2531f00be5f33074d858',
                },
              ],
            },
          },
        },
      })
    }).as('fetchAudioData')
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songCard"]').contains(" I Think We're Alone Now")
    cy.get('[data-automation="record-button"]').click()
    cy.get('[data-automation="songCard"]').should('not.exist')
    cy.get('[data-automation="songNotFoundCard"]').should('not.exist')
    cy.tick(11000)
    cy.intercept('POST', 'http://localhost:3001/audio_info', (req) => {
      req.reply({
        result: null,
      })
    }).as('fetchAudioData')
    cy.wait('@fetchAudioData')
    cy.get('[data-automation="songNotFound"]').should('be.visible')
  })
})
