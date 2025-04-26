describe('HomeContainer and ResultsContainer', () => {
	beforeEach(() => {
		cy.intercept('GET', 'https://watts-my-electricity-bill-be.onrender.com/api/v1/utilities*', {
			fixture: 'utilityResults.json'
		}).as('getUtilityResults')

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

	it('submits the form and displays updated results including slider and radio button', () => {
		cy.get('input[name="nickname"]').type('Test Home')
		cy.get('input[name="zipcode"]').type('80236')
		cy.get('input[name="occupants"]').type('2')
		cy.get('input[type="radio"][value="apartment"]').check()
		cy.get('input[type="range"][name="energyUsage"]').invoke('val', 7).trigger('input')
		cy.get('form button[type="submit"]').click()
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

	it('displays the correct error when zipcode field is invalid', () => {
		cy.get('input[name="nickname"]').type('Test Home')
		cy.get('input[name="zipcode"]').type('8023677')
		cy.get('input[type="radio"][value="apartment"]').check()
		cy.get('input[type="range"][name="energyUsage"]').invoke('val', 7).trigger('input')
		cy.get('input[name="occupants"]').type('2')

		cy.get('form button[type="submit"]').click()
		cy.get('.results-window').within(() => {
			cy.get('p').first().should('contain', 'Your Estimated Energy Usage and Costs for "Test Home"')
			cy.get('button').should('exist')
		})

		cy.get('form')
			cy.get('p').first().should('contain', "Error: Invalid zip code, try 5 digits!")

	})

	it('displays the correct error when occupant field is invalid', () => {
		cy.get('input[name="nickname"]').type('Test Home')
		cy.get('input[name="zipcode"]').type('80236')
		cy.get('input[type="radio"][value="apartment"]').check()
		cy.get('input[type="range"][name="energyUsage"]').invoke('val', 7).trigger('input')
		cy.get('input[name="occupants"]').type('0')

		cy.get('form button[type="submit"]').click()

		cy.get('form')
			cy.get('p').first().should('contain', "Error: There must be at least 1 occupant!")

	})
})
