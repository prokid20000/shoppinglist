const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

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