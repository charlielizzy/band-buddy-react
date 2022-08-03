describe('happy-path', () => {
  it('text in button should change to recording once clicked', () => {
    cy.visit('http://localhost:3000')
    cy.get('[id="record-button"]').click()
    cy.get('[id="record-button"]').contains('Recording...')
  })
  it('after 10 seconds text should change back', () => {
    cy.clock()
    cy.visit('http://localhost:3000')
    cy.get('[id="record-button"]').click()
    cy.get('[id="record-button"]').contains('Recording...')
    cy.tick(11000)
    cy.get('[id="record-button"]').contains('Click')
  })
  it('record button should be disabled after one click', () => {
    cy.visit('http://localhost:3000')
    cy.get('[id="record-button"]').click()
    cy.get('[id="record-button"]').should('be.disabled')
  })
  it('record button should be reenabled after 10 seconds of being disabled', () => {
    cy.clock()
    cy.visit('http://localhost:3000')
    cy.get('[id="record-button"]').click()
    cy.get('[id="record-button"]').should('be.disabled')
    cy.tick(11000)
    cy.get('[id="record-button"]').should('not.be.disabled')
  })
  it.only('should return song name, artist and album', () => {
    cy.clock()
    cy.visit('http://localhost:3000')
    cy.get('[id="record-button"]').click()
    cy.tick(10001)
    cy.intercept('POST', 'http://localhost:4000/audio_info', (req) => {
      req.reply({
        result: {
          title: "I Think We're Alone Now",
          artist: 'Tiffany',
          album: 'Best Pride Music',
        },
      })
    }).as('fetchAudioData')

    cy.wait('@fetchAudioData')

    cy.get('[id="song-info"]').contains(
      "This song is called I Think We're Alone Now"
    )
  })
})
