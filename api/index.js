"use strict";

const config = require("./config.json");

const co = require("co");
const koa = require("koa");
const cors = require("kcors");
const bodyParser = require("koa-body");

const db = require("./models/index.js");

const app = koa();
exports.app = app;

app.use(cors({ credentials: true }));

// trust proxy
app.proxy = true;

// body parser
app.use(bodyParser());

app.use(function* error(next) {
	try {
		yield next;
	} catch (err) {
		this.status = err.status || 500;
		this.body = err.message;
		this.app.emit("error", err, this);
	}
});

require("./routes");

co(function *() {
	var connection = yield db.sequelize.sync();
	if (connection) {
		console.log(`${config.site.name} is now listening on port ${config.site.port}`);
		app.listen(config.site.port);
	}
});

process.on("SIGINT", function exit() {
	process.exit();
});
