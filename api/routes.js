"use strict";

const config = require("./config.json");
const path = require("path");
const app = require("./index.js").app;

const Router = require("koa-router");
const routes = new Router();
const bodyParser = require("koa-body");
const bodyParserConfig = {
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, "../src/assets/uploads"),
    keepExtensions: true
  }
};

const user = require("./controllers/user.js");
const meal = require("./controllers/meal.js");

routes.post("/api/users", user.create);
routes.get("/api/users", user.get);
routes.get("/api/users/:id", user.get);
routes.put("/api/users/:id", user.update);
routes.delete("/api/users/:id", user.destroy);
routes.post("/api/users/upload", bodyParser(bodyParserConfig), user.upload);

routes.post("/api/meals", meal.create);
routes.get("/api/meals", meal.get);
routes.get("/api/meals/:id", meal.get);
routes.put("/api/meals/:id", meal.update);
routes.delete("/api/meals/:id", meal.destroy);
routes.post("/api/meals/upload", bodyParser(bodyParserConfig), meal.upload);

app.use(routes.middleware());
