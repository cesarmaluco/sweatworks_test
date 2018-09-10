// IMPORTS /////////////////////////////////////////////////////////////////////
let Chai = require("chai");
const request = require('supertest');
const express = require('express');

const app = express("http://localhost:1340");


app.post('/api/author/search', function (req, res) {
	res.status(200).json({ filters: {} });
});

app.post('/api/author/create', function (req, res) {
	res.status(200).json({ Author: {Name: 'Testing User', User: 'test@gmail.com', BirthDate: '1970-01-01', Pwd: 'testpwd'} });
});



// IMPLEMENTATION //////////////////////////////////////////////////////////////
describe("Get Authors", () => {
	it("shows the authors from json", () => {
		request(app)
			.post('/api/author/search')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) throw res;
			});
	});
});

describe("Post Author", () => {
	it("create new author", () => {
		request(app)
			.post('/api/author/create')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) throw res;
			});
	});
});
// EXPORTS /////////////////////////////////////////////////////////////////////
