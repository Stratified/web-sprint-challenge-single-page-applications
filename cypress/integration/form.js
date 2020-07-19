describe('Testing the form.', () => {
	it('Performing MVP tests.', () => {
		cy.visit('http://localhost:3000/pizza');

		cy.get('[name="name"]').type('Brian').should('include.value', 'Brian');

		cy.get('[type="checkbox"]').check();
		cy.contains('Submit').click();
	});
});
