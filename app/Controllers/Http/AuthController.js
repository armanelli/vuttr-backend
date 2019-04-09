"use strict";

const User = use("App/Models/User");
const Helpers = use("App/Helpers");

class AuthController {
  async register({ request, response, auth }) {
    let { name, email, password } = request.all();

    if (!Helpers.isValidEmail(email)) {
      return response
        .status(422)
        .send({ message: "O E-mail informado é inválido." });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    return user;
  }

  async login({ request, auth }) {
    const { email, password } = request.all();

    const info = await auth.attempt(email, password);

    const user = await User.query()
      .where({ email: email })
      .first();

    return { token: info.token, user: user };
  }
}

module.exports = AuthController;
