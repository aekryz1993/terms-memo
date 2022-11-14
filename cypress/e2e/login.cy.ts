describe("Creating a message", () => {
  it("Displays the message in the list", () => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("#username-input").type("user_0");
    cy.get("#password-input").type("user_0");
    cy.get(".button").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
