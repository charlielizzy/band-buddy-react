describe('RecordingButton.cy.js', () => {
  it('text in button should change to recording once clicked', () => {
    cy.visit('http://localhost:3000')
    cy.get('[id="record-button"]').click()
  })
})
