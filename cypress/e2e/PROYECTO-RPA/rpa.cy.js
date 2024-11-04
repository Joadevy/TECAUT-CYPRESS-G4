/// <reference types="cypress" />

let availability = "";
let actualPrice = 0;
let lastPrice = 0;
const URL = Cypress.env("url");

context('Acciones', () => {
    it("Visitar pagina", ()=>
        {
        lastPrice = cy.readFile('cypress/e2e/PROYECTO-RPA/datos.json');
        cy.log(lastPrice);
        cy.log(URL);
        cy.visit(URL);
        
        cy.get('[class^="stockDetalle"]')
            .find('span')  
            .invoke('text')        
            .then((text) => {
                availability = text.trim();
                cy.log(text);            
                
                expect(text.trim()).to.eq('DISPONIBLE');
            });

            cy.get('div.product__prices > span.product-card__new-price')
            .invoke('text')
            .then((text) => {
                const numericPrice = parseInt(text.trim().replace(/[^0-9]/g, ''), 10);
                const date = new Date();
                const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
                cy.writeFile('cypress/e2e/PROYECTO-RPA/datos.json', { lastPrice: numericPrice, availability: availability, url: URL, date: formattedDate });
            });

    });

    it("Enviar mensaje telegram", ()=>
    {
        cy.log(availability);
        // cy.request({
        //     method: 'POST',
        //     url: 'https://api.telegram.org/bot'+Cypress.env("BOT")+'/sendMessage',
        //     form: true,
        //     body: {
        //         chat_id: Cypress.env("CHAT_ID"),
        //         text: `Hola, el producto esta en estado: ${availability}`
        //     }
        // }).then((response) => {
        //     expect(response.status).to.eq(200);
        //     expect(response.body.ok).to.eq(true);
        // }
        // );
    });
});