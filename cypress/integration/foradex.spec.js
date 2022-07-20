import { initialItems, initialUser } from "./test_helper";

// Mocha docs recommends using "function" syntax rather than arrow
// so that "this" is available.
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

describe("Foradex", function () {
  beforeEach(function () {
    // Ensure the database is in the same state before each test
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", initialUser);
    cy.request("POST", "http://localhost:3001/api/items", initialItems[0]);
    cy.request("POST", "http://localhost:3001/api/items", initialItems[1]);
  });

  describe("Logging in", function () {
    it("should be able to log in", function () {
      cy.visit("http://localhost:3000");
      cy.contains("show login").click();
      cy.get("#loginInputUsername").type(initialUser.username);
      cy.get("#loginInputPassword").type(initialUser.password);
      cy.get("#loginButton").click();
      cy.contains(`${initialUser.name} logged in`);
    });

    it("should fail to login with bad credentials", function () {
      cy.visit("http://localhost:3000");
      cy.contains("show login").click();
      cy.get("#loginInputUsername").type("initialUser");
      cy.get("#loginInputPassword").type("wrong-password");
      cy.get("#loginButton").click();
      // get("html") accesses whole visible content of application
      cy.get("html").should("not.contain", `${initialUser.name} logged in`);
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      // Use custom command defined in cypress/support/commands.js
      cy.login(initialUser);
    });

    it("second item turns green when toggle found is clicked", function () {
      cy.contains("The Prince").as("thePrince");
      cy.get("@thePrince").contains("toggle found").click();
      cy.get("@thePrince").should(
        "have.css",
        "background",
        "rgb(144, 238, 144) none repeat scroll 0% 0%"
      );
      cy.get("@thePrince")
        .parent()
        .contains("Horse Mushroom")
        .should("have.css", "background", "rgb(255, 0, 0) none repeat scroll 0% 0%");
    });

    it("item can be searched for and only that item is displayed", function () {
      cy.get("#searchBarInput").type("arvensi");
      cy.contains("Agaricus arvensis");
      cy.contains("Agaricus augustus").should("not.exist");
    });

    it("there are two items displayed", function () {
      // Cypress commands are like promises, so to access return values we use .then()
      cy.get(".item").then((items) => {
        expect(items.length).to.equal(2);
      });
    });
  });
});
