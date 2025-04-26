describe('User Reports Page search', () => {
  const userId = 1;

  it('loads the saved reports for a user and allows switching tabs', () => {
    cy.visit(`https://watts-my-electricity-bill-fe.onrender.com/user/${userId}/saved`);

    cy.contains(`User ID ${userId}'s Reports`);

    cy.get('.buttonList button').should('exist');

    cy.contains('Search').click();
    cy.url().should('include', `/user/${userId}`);

    cy.get('form').should('exist');
    cy.get('input[placeholder="Nickname"]').should('exist');
  });
});

describe('User Reports Page', () => {
  const userId = 1;

  it('loads the saved reports for a user and allows switching tabs', () => {
    cy.visit(`https://watts-my-electricity-bill-fe.onrender.com/user/${userId}/saved`, {
      failOnStatusCode: false
    });

    cy.wait(5000); 

    cy.contains(`User ID ${userId}'s Reports`, { timeout: 10000 });

    cy.get('.buttonList button').should('exist');

    cy.get('.buttonList button').first().click();

  });
});