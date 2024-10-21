/// <reference types="cypress" />
// import { MailSlurp } from "mailslurp-client";

let value = undefined;
// const TO = Cypress.env("TO");
// const API_KEY = Cypress.env("API_KEY");
// const mailslurp = new MailSlurp({apiKey:API_KEY});
// const from = Cypress.env("FROM");

context('Actions', () => {
    it("Open Nasdaq", ()=>
    {
        // cy.log(MailSlurp);
        cy.visit('https://spacegamer.com.ar/169606-notebooks-gigabyte-notebook-g5-i5-11400h-rtx-3050-ti-16g-512ssd-144hz-w111');
        
        cy.get('[class^="stockDetalle"]')
            .find('span')  
            .invoke('text')        
            .then((text) => {
                value = text;
                cy.log(text);            
                
                expect(text.trim()).to.eq('DISPONIBLE');
            });
    });

    // it("Find value", ()=>
    // {
    //     cy.get(".product-details__info__additional__item__title").should((e)=>
    //     {
    //         if (e != null)
    //         {
    //             value = e.first().text();
    //             value.should("Stock disponible");
    //         }
    //     });
    // });

    it("Email value", ()=>
    {
        cy.log(value);
        // await mailslurp.sendEmail(from,
        //     {
        //         to:[TO],
        //         subject:'0.5% kurs ' + value,
        //         body:value
        //     }
        // ); 
    });
});