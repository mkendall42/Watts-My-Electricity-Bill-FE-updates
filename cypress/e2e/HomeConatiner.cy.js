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
	//   cy.get('.ideas-container').should('exist')
	//   cy.get('.card').should('have.length', 3)
	//   cy.get('.card').first().find('h3').should('have.text', 'Bluetooth rotary phone')
	//   cy.get('.card').first().find('p').should('have.text', 'Because it\'s cool as heck and who wants a landline these days')
	//   cy.get('.card').first().find('button').should('exist')
	//   cy.get('.card').last().find('h3').should('have.text', 'Waterproof books')
	//   cy.get('.card').last().find('p').should('have.text', 'For reading in a pool/ocean/bathtub')
	//   cy.get('.card').first().find('button').should('exist')
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
