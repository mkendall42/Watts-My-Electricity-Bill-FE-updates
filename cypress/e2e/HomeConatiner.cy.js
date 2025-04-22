describe('HomeContainer', () => {
	beforeEach(() => {
		// cy.intercept("GET", "http://localhost:3001/api/v1/utilities", {
		//   statusCode: 200,
		//   fixture: "results"
		// })

		cy.visit('http://localhost:5173')
	})

	it('displays the application title', () => {
		cy.get('h1').should('contain', 'Watts My Electrical Bill')
	})

	it('displays the form ', () => {
		cy.get('form').should('exist')
		cy.get('form input[name="nickname"]').should('exist')
		cy.get('form input[name="lat"]').should('exist')
		cy.get('form input[name="long"]').should('exist')
		cy.get('form input[name="residenceType"]').should('exist')
		cy.get('form input[name="occupants"]').should('exist')
		cy.get('form input[name="energyUsage"]').should('exist')
		cy.get('form button').should('exist')
	})

	it('ResultsContainer', () => {
	  cy.get('.results').should('exist')
	  .get('p').first().should('have.text', 'Your Estimated Energy Usage for undefined')
	  .get('.results').first().should('have.text', '')
	  .get('.results').last().should('have.text', '')
	})

	it('adds a new idea to the list', () => {
		cy.get('form').should('exist')
		cy.get('form input[name="nickname"]').should('exist')
		cy.get('form input[name="lat"]').should('exist')
		cy.get('form input[name="long"]').should('exist')
		cy.get('form input[name="residenceType"]').should('exist')
		cy.get('form input[name="occupants"]').should('exist')
		cy.get('form input[name="energyUsage"]').should('exist')
		cy.get('form button').should('exist')
		cy.get('form button').click()
	})
})
