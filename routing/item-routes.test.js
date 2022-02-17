"use strict";

const request = require("supertest");

const app = require("../app");
let db = require("../fakeDb");

const testItem = { name: "test", price: 1.00 };

beforeEach(function () {
  db.items.push(testItem);
});

afterEach(function () {
  db.items = [];
});

/** test get all items */
describe("GET /items", function () {
  it("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ items: [testItem] });
  });
});

/** test add item */
describe("POST /items", function () {
  it("Add item on list", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "birthday",
        price: 100.00
      });
    //test the whole body
    expect(resp.body.added).toEqual({
      name: "birthday",
      price: 100.00
    });
    expect(db.items.length).toEqual(2);

  });
});

/** test get specific item */
describe("GET/items/:name", function () {
  it("Gets single item", async function () {
    const resp = await request(app).get(`/items/test`);
    //better to test generally, less specifically
    expect(resp.body.name).toEqual("test");
  })

});

/** test items patch */
describe("PATCH /items/:name", function () {
  it("Patch item in list", async function () {
    const resp = await request(app)
      .patch(`/items/test`)
      .send({
        name: "birthday",
      });

    expect(resp.body).toEqual({updated: {name:"birthday", price: 1.00}});
  });
});

/** test items delete */
describe("DELETE/items/:name", function () {
  it("Deletes single item", async function () {
    const resp = await request(app).delete(`/items/test`);

    //make others like this
    expect(resp.body).toEqual({ message: "Deleted" })
    expect(db.items.length).toEqual(1);
  })
});

//TODO: docstrings show returns