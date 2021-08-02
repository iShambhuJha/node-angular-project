/// <reference types="cypress" />
describe('Drivers page functions', ()=>{
  var driverName: string,driverGender: string,driverPhone: string;

  before(()=>{
    cy.request('http://localhost:3000/getDrivers').as('drivers');
    cy.get('@drivers').should('have.property', 'status', 200);
    cy.get('@drivers').its('body').then((body) => {
      const data = JSON.parse(body);
       driverName = data[0].driverName;
       driverGender = data[0].driverGender;
       driverPhone = data[0].driverPhone;
    })
  })
  it('Should visit drives page', ()=>{
    cy.visit("http://localhost:4200/drivers");
  })

  it('Driver cards should be visible', ()=>{
    cy.get('.driver-card', {timeout:15000}).should('be.visible');
  })

  it('Drivers basic details should be visible', ()=>{
    cy.get('.card-title', {timeout:15000}).eq(0).should('be.visible');
    cy.get('.card-subtitle', {timeout:15000}).eq(0).should('be.visible');
  })

  it('Drivers location details should be visible', ()=>{
    cy.get('.actualLocation', {timeout:15000}).eq(0).should('be.visible');
    cy.get('.lastLocation', {timeout:15000}).eq(0).should('be.visible');
  })

  it('Should have loaded drivers profile pic', ()=>{
    cy.get('[alt="user_profile_pic"]').eq(0).should('be.visible');
  })

  it('Should verify the driver name', ()=>{
    cy.get('.driver-card', {timeout:15000}).should('contain',driverName);
  })
  it('Should verify the driver phone', ()=>{
    cy.get('#driver-phone', {timeout:15000}).should('contain',driverPhone);
  })
})
