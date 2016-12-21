"use strict";

const config = require("../config.json");

const _ = require("lodash");

const userModel = require("../models/index.js")['User'];

module.exports.create = function* create() {
	try {
		this.body = yield userModel.create(this.request.body);
	} catch (err) {
		throw new Error({status: 500, message: err.message || err});
	}
};

module.exports.get = function* get() {
	try {
		if (_.isEmpty(this.params)) {
			this.body = yield userModel.findAll({
				order: [['id', 'ASC']],
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			});
		} else {
			this.body = yield userModel.find({
				where: {
					id: this.params.id
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			});
		}
	} catch (err) {
		throw new Error({status: 500, message: err.message || err});
	}
};

module.exports.update = function* update() {
	try {
		let updatedUser = yield userModel.update(this.request.body, {
			where: {
				id: this.params.id
			},
			returning: true
		});

		this.body = updatedUser[1][0];
	} catch (err) {
		throw new Error({status: 500, message: err.message || err});
	}
};

module.exports.destroy = function* destroy() {
	try {
		yield userModel.destroy({
			where: {
				id: this.params.id
			}
		});

		this.status = 204;
	} catch (err) {
		throw new Error({status: 500, message: err.message || err});
	}
};
