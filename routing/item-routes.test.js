const request = require("supertest");

const app = require("../app");
let db = require("../fakeDb");

const testItem = {name: "test", price: 1.00};

beforeEach(function(){
    db.items.push(testItem);
});

afterEach(function(){
    db.items = [];
});

describe("GET /items", function() {
    it("Gets a list of items", async function() {
      const resp = await request(app).get(`/items`);

      expect(resp.body).toEqual({items: [testItem]});
    });
  });

describe("POST /items", function(){
  it("Add item on list", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "birthday",
        price: 100.00
    });
    expect(resp.body.added).toEqual({
      name: "birthday",
      price: 100.00
    });

  });
});


describe("GET/items/:name", function() {
    it("Gets single item", async function(){
      const resp = await request(app).get(`/items/test`);
      expect(resp.body.name).toEqual("test");
    })

})