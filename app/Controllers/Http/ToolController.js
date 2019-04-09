"use strict";

const Tool = use("App/Models/Tool");

class ToolController {
  async index({ auth }) {
    const tools = await Tool.query()
      .where("user_id", auth.user.id)
      .fetch();

    return tools;
  }

  async store({ request, response, auth }) {
    const data = request.only(["title", "link", "description", "tags"]);

    const tool = await Tool.create({
      ...data,
      user_id: auth.user.id
    });

    return tool;
  }

  async show({ params, request, response, auth }) {
    const tool = await Tool.query()
      .where({ user_id: auth.user.id, id: params.id })
      .first();

    if (!tool)
      return response.status(404).json({
        message: "Sorry, we didn't find any tools that match your request."
      });

    return tool;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response, auth }) {}
}

module.exports = ToolController;
