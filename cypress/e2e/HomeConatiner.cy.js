describe('HomeContainer and ResultsContainer', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173')
	})

	it('displays the application title', () => {
		cy.get('h1').should('contain', 'Watts My Electrical Bill')
	})

	it('displays the form with all expected inputs', () => {
		cy.get('form').should('exist')
		cy.get('form input[name="nickname"]').should('exist')
		cy.get('form input[name="zipcode"]').should('exist')
		cy.get('form input[name="residenceType"]').should('exist')
		cy.get('form input[name="occupants"]').should('exist')
		cy.get('form input[name="energyUsage"]').should('exist')
		cy.get('form button').should('exist')
	})

	it('displays default ResultsContainer message when no search submitted', () => {
		cy.get('.results-window')
			.should('exist')
			.within(() => {
				cy.contains('Results will appear here once you submit a valid search or view a saved report!')
			})
	})

	it('submits the form and displays updated results', () => {
		cy.get('input[name="nickname"]').type('Test Home')
		cy.get('input[name="zipcode"]').type('80236')
		cy.get('input[name="residenceType"]').type('apartment')
		cy.get('input[name="occupants"]').type('2')
		cy.get('input[name="energyUsage"]').type('1')

		cy.get('form button').click()

		cy.get('.results-window').within(() => {
			cy.get('p').first().should('contain', 'Your Estimated Energy Usage and Costs for "Test Home"')
			cy.get('button').should('exist')
		})
	})

	it('navigates to the login page when clicking the Login link', () => {
		cy.get('nav').within(() => {
			cy.contains('Login').click()
		})

		cy.url().should('include', '/login')
		cy.get('.loginContainer').should('exist')
		cy.contains('User:')
	})
})
