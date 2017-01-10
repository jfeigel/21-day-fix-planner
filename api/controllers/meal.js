"use strict";

const config = require("../config.json");

const _ = require("lodash");

const mealModel = require("../models/index.js")['Meal'];

module.exports.create = function* create() {
	try {
		this.body = yield mealModel.create(this.request.body);
	} catch (err) {
		throw new Error({status: 500, message: err.message || err});
	}
};

module.exports.get = function* get() {
	try {
		if (_.isEmpty(this.params)) {
			this.body = yield mealModel.findAll({
				order: [['id', 'ASC']]
			});
		} else {
			this.body = yield mealModel.find({
				where: {
					id: this.params.id
				}
			});
		}
	} catch (err) {
		throw new Error({status: 500, message: err.message || err});
	}
};

module.exports.update = function* update() {
	try {
		let updatedMeal = yield mealModel.update(this.request.body, {
			where: {
				id: this.params.id
			},
			returning: true
		});

		this.body = updatedMeal[1][0];
	} catch (err) {
		throw new Error({status: 500, message: err.message || err});
	}
};

module.exports.destroy = function* destroy() {
	try {
		yield mealModel.destroy({
			where: {
				id: this.params.id
			}
		});

		this.status = 204;
	} catch (err) {
		throw new Error({status: 500, message: err.message || err});
	}
};

module.exports.upload = function* upload() {
	this.body = this.request.body.files.file;
};
