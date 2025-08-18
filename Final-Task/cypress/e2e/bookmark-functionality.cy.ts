describe("Bookmark Button Functionality", () => {
  beforeEach(() => {
    cy.visit("/api/auth/signin");
    cy.get("#email").should("not.be.disabled").type("hanamesfin67@gmail.com");
    cy.get("#password").should("not.be.disabled").type("hana1234");
    cy.get("#submit").should("not.be.disabled").click().as("login");
    cy.wait(6000);
    cy.visit("/opportunities");
  });

  it("should toggle the bookmark state when clicked", () => {
    cy.get('[data-id="bookmark-btn"]')
      .first()
      .should("have.attr", "data-bookmarked", "true"); // <-- match actual initial value
    cy.get('[data-id="bookmark-btn"]').first().click();
    cy.wait(500);
    cy.get('[data-id="bookmark-btn"]')
      .first()
      .should("have.attr", "data-bookmarked", "true");
    cy.get('[data-id="bookmark-btn"]').first().click();
    cy.wait(500);
    cy.get('[data-id="bookmark-btn"]')
      .first()
      .should("have.attr", "data-bookmarked", "false");
  });
});
