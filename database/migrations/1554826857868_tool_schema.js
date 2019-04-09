'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ToolSchema extends Schema {
  up () {
    this.create('tools', (table) => {
      table.increments()
      table.uuid("user_id").notNullable().references("id").inTable("users");
      table.string('title').notNullable()
      table.string('link').notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  /*
  
  {
        id: 1,
        title: "Notion",
        link: "https://notion.so",
        description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
        tags: [
            "organization",
            "planning",
            "collaboration",
            "writing",
            "calendar"
        ]
    },
  
  */

  down () {
    this.drop('tools')
  }
}

module.exports = ToolSchema
