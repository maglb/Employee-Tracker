const inquirer = require("inquirer");
const { viewEmployees, addEmployees, newEmployee } = require("./employees");
const { viewRoles, addRole, UpdateRole } = require("./roles");
const { viewDepartments, addDepartment } = require("./departments");
const express = require("express");
const mysql = require("mysql2/promise");
const db = require("./config/connection");

const startApp = (connection) => {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "options",
        choices: [
          "View All Employees",
          "Add An Employee",
          "Update An Employee Role",
          "View All Roles",
          "Add A Role",
          "View All Departments",
          "Add A Department",
          "Exit",
        ],
      },
    ])
    .then((data) => {
      switch (data.options) {
        case "View All Employees":
          return viewEmployees(connection);
          break;
        case "Add An Employee":
          return newEmployee(connection);
          break;
        case "Update An Employee Role":
          return updateEmployee(connection);
          break;
        case "View All Roles":
          return viewRoles(connection);
          break;
        case "Add A Role":
          return addRole(connection);
          break;
        case "View All Departments":
          return viewDepartments(connection);
          break;
        case "Add A Department":
          return addDepartment(connection);
          break;
        case "Add A Department":
          return UpdateRole(connection);
          break;
        case "Exit":
          return true;
          break;
      }
    })
    .then( (shouldExit) => {
if (!shouldExit) {
  return startApp(connection);
}
    })
};

// TODO: Create a function to initialize app
function init() {
  db.then((connection) => {
    return startApp(connection)
      .catch((err) => console.error(err))
      .then( () => {
         console.log("Goodbye");
        return connection.end();
      })
  })
}

// Function call to initialize app
init();
