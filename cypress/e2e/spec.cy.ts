/* eslint-disable max-lines-per-function */
describe('Challenger tests', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	it('Contains the Create hero button', () => {
		cy.contains('button', 'Create hero');
	});
	it('Opens HeroCreationDialog when click on the button', () => {
		cy.contains('button', 'Create hero')
			.click()
			.get('div')
			.should('have.class', 'hero-creation-dialog-main-container');
		cy.contains('button', 'Save');
		cy.contains('button', 'Close');
	});
	it('Contains the Ahab row', () => {
		cy.contains('td', 'Ahab');
	});
	it('Opens HeroDetailDialog when click on the row', () => {
		cy.contains('td', 'Ahab')
			.click()
			.get('div')
			.should('have.class', 'hero-detail-dialog-main-container');
		cy.contains('button', 'Close');
		cy.contains('div', 'Ahab');
	});
	it('Shows the charts', () => {
		cy.get('svg').should('have.class', 'ngx-charts');
	});
});
