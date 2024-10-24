/// <reference types="cypress" />
// import { MailSlurp } from "mailslurp-client";

let value = "";
// const TO = Cypress.env("TO");
// const API_KEY = Cypress.env("API_KEY");
// const mailslurp = new MailSlurp({apiKey:API_KEY});
// const from = Cypress.env("FROM");
const URL = Cypress.env("url");

context('Acciones', () => {
    it("Visitar pagina", ()=>
        {
        cy.log(URL);
        cy.visit(URL);
        
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

    it("Enviar mensaje telegram", ()=>
    {
        cy.log(value);
        cy.request({
            method: 'POST',
            url: 'https://api.telegram.org/bot'+Cypress.env("BOT")+'/sendMessage',
            form: true,
            body: {
                chat_id: Cypress.env("CHAT_ID"),
                text: `Hola, el producto esta en estado: ${value}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.ok).to.eq(true);
        }
        );
    });
});