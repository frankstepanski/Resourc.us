import { describe } from "mocha";

describe('Testing All Routes', () => {
    it('Visit Resources.us!', () => {
        cy.visit('http://localhost:4000/')
    });

    it('Visit Home page!', () => {       
        cy.contains('Resourc.us').click()        
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
    })

    it('it focuses the input', () =>{
        cy.get('input[name="title"]').as('Title'); 
        cy.get('input[name="title"]').type('Testing'); 
        
    })
})