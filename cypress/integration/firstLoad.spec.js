describe("First Game Load", () => {
  it("Should see a canvas", () => {
    cy.visit("http://127.0.0.1:5500/");
    cy.wait(20000);

    cy.get("canvas").toMatchImageSnapshot();
  });
});
