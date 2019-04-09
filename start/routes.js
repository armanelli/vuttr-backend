"use strict";

const Route = use("Route");

//Route.get("/sonda/status", "SondaController.index");

Route.post("/auth/register", "AuthController.register");
Route.post("/auth/login", "AuthController.login");

Route.resource("/tools", "ToolController").middleware(["auth"]);
