describe("Move player", () => {
  it.skip("Pick star", () => {
    cy.visit("http://127.0.0.1:5500/");

    cy.wait(3000);

    const rightArrow = 39;
    cy.get("canvas").trigger("keydown", { keyCode: rightArrow });
    cy.wait(1500);
    cy.get("canvas").trigger("keyup", { keyCode: rightArrow });

    cy.wait(15000);
    cy.get("canvas").toMatchImageSnapshot();
  });

  it.skip("Jump and pick star", () => {
    cy.visit("http://127.0.0.1:5500/");

    cy.wait(20000);

    const rightArrow = 39;
    const upArrow = 38;
    cy.get("canvas").trigger("keydown", { keyCode: rightArrow });
    cy.wait(1000);
    cy.get("canvas").trigger("keydown", { keyCode: upArrow });
    cy.wait(1300);
    cy.get("canvas").trigger("keyup", { keyCode: rightArrow });
    cy.get("canvas").trigger("keyup", { keyCode: upArrow });

    cy.wait(3000);

    cy.get("canvas").toMatchImageSnapshot();
  });
});
