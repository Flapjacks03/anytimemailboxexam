describe('Anytime Mailbox Automation Tests', () => {
  //beforeEach(() => {
    //cy.visit('https://www.anytimemailbox.com/');
  //});

  it('Search with a valid address or city returns a location', () => {
    Cypress.on('uncaught:exception', (err, runnable) => { // proceed with errors
      return false;
    });
      cy.visit('https://www.anytimemailbox.com'); // visit anytime mailbox website
      cy.wait(5000)
      cy.get('#lookup').click({ force: true }).type('New York');
      cy.get('.btn.theme-button').click({ force: true });
      cy.get('#top-loc').should('be.visible').and('contain', 'New York');

  });

  it('Search with an invalid address or city returns no results', () => {
    cy.visit('https://www.anytimemailbox.com');
    cy.wait(5000)
    cy.get('#lookup').click({ force: true }).type('InvalidCityName123');
    cy.get('.btn.theme-button').click({ force: true });
    cy.get('#alterr').should('contain', 'We are unable to locate the place you entered. Please try again.');
  });

  it('Login fails with incorrect credentials', () => {
    cy.visit('https://www.anytimemailbox.com');
    cy.wait(5000)
    cy.contains('a', 'LOG IN').click({ force: true }); // Open login modal/page
    cy.get('#f_uid').type('invalid@example.com'); // Input Username
    cy.get('#f_pwd').type('wrongpassword{enter}'); // Input Password
    cy.get('iframe[title="reCAPTCHA"]', { timeout: 10000 }) // Wait up to 10s
      .its('0.contentDocument').should('exist')
      .then((doc) => {
    cy.wrap(doc).find('#recaptcha-anchor').should('be.visible').click();
    cy.get('button', 'Log In').click();
    cy.get('#alterr').should('contain', 'Invalid credentials, please try again.');
    });
  });
});
