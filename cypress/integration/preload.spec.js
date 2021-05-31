import {
  SKY,
  GROUND,
  STAR,
  BOMB,
  PLAYER,
} from "../../src/scripts/constants/assets";

describe("Preload", () => {
  const interceptGetRequest = (name) => {
    cy.intercept({
      method: "GET",
      url: `assets/${name}.png`,
    }).as(name);
  };

  const expectRequestWasMade = ({ response }) => {
    assert.isNotNull(response);
  };

  it("Assets shall be requested", () => {
    interceptGetRequest(SKY);
    interceptGetRequest(GROUND);
    interceptGetRequest(STAR);
    interceptGetRequest(BOMB);
    interceptGetRequest(PLAYER);

    cy.visit("http://127.0.0.1:5500/");

    cy.wait(`@${SKY}`).then(expectRequestWasMade);
    cy.wait(`@${GROUND}`).then(expectRequestWasMade);
    cy.wait(`@${STAR}`).then(expectRequestWasMade);
    cy.wait(`@${BOMB}`).then(expectRequestWasMade);
    cy.wait(`@${PLAYER}`).then(expectRequestWasMade);
  });
});
