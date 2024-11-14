/// <reference types="cypress" />

let availability = "";
let actualPrice = 0;
let lastPriceQuery = 0;
let lastDateQuery = "";
const URL = Cypress.env("url");

context('Acciones', () => {
    it("Visitar pagina", ()=>
        {
        cy.task("fetchLogs").then((lastLog) => {
            if (lastLog) {
                lastPriceQuery = lastLog.last_price;
                lastDateQuery = lastLog.created_at;
                cy.log(`Último precio: ${lastLog.last_price}, Fecha: ${lastLog.created_at}`);
            } else {
                cy.log("No se encontraron registros en la base de datos");
            }
        });
        
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
                actualPrice = numericPrice;
                  cy.task("insertLog", {
                    lastPrice: numericPrice,
                    availability: availability,
                    url: URL,
                }).then((result) => {
                    cy.log(result); // Mensaje de confirmación
                });
            });

    });

    it("Enviar mensaje telegram", ()=>
    {
        cy.log(availability);
        cy.request({
            method: 'POST',
            url: 'https://api.telegram.org/bot'+Cypress.env("BOT")+'/sendMessage',
            form: true,
            body: {
                chat_id: Cypress.env("CHAT_ID"),
                text: `Hola, el producto esta en estado: ${availability}. El precio actual es: ${actualPrice}. El precio anterior al ${lastDateQuery} era: ${lastPriceQuery}.`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.ok).to.eq(true);
        }
        );
    });
});