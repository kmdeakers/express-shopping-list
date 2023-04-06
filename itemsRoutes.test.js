"use strict"


const request = require("supertest");

const app = require("./app")
const db = require("./fakeDb")
const { itemsRoutes } = require("./itemsRoutes");


const item = { name: "banana", price: 1.50 }

beforeEach(function() {
    db.items.push(item)
})

afterEach(function() {
    db.items = [];
})


describe("GET /", function() {
    it("Gets a list of all items", async function() {
        const resp = await request(app).get('/');

        expect(resp.body).toEqual({ items: [item]});
    });
})

describe("POST /", function() {
    it("Adds new item to items", async function() {
        const resp = await request(app)
        .post("/")
        .send({
            name: "apple",
            price: 1.25
        });
        expect(resp.body).toEqual({
            added: {name: "apple", price: 1.25}
        });
    });

});

