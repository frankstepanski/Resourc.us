import { describe } from "mocha";


describe('Testing All Routes', () => {
    it('Visit Resources.us!', () => {
        cy.visit('http://localhost:4000/')
    });

    it('Visit Home page!', () => {       
        cy.contains('Resourc.us').click();
        cy.url().should('include', '/')        
    });

    it('Visit View All Teams!', () => {            
        cy.contains('View all Teams').click()    
        cy.url().should('include', '/teams')   
    });

    it('Visit View All Teams!', () => {             
        cy.contains('ResourceCard').click()
        cy.url().should('include', '/ResourceCard')
    })
});

describe('Create Resource', () => {
    it('click on Create Resource button', () =>{
        cy.contains('Create Resource').click()        
        cy.url().should('include', '/CreateResource')
    });

    it('Inserting values in from', () =>{
        cy.get('input[name="title"]').type('Testing Javascript'); 
        cy.get('input[name="link"]').type('https://testingjavascript.com/'); 
        cy.get('input[name="description"]').type('Medium Article about testing with javascript');
        cy.get('input[name="category"]').type('Testing');
        cy.get('select').select('js.j');    
        
    });

    it('submitting the create resource form', () => {
        cy.get('form button').focus().type('{enter}');
        cy.url().should('include', '/teams/606fa2b39146be28386764d3')
    });

    it('deleting the created resource', () => {
        cy.get('div[class="link"]').contains('https://testingjavascript.com/');
        cy.contains('x').click();
    });    




    
})