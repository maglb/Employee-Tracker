const express = require("express");
const inquirer = require("inquirer");

// See all roles
const viewRoles = (connection) => {
  const allRoles = `SELECT roles.id, roles.title, departments.department_name, roles.salary
FROM roles
JOIN departments ON departments.id = roles.department_id
ORDER BY roles.id ASC;`;

  connection
    .query(allRoles)
    .then(function (results) {
      console.table(results[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get data about new role
const addRole = (connection) => {
  // Get data for all roles
  return Promise.all([
    connection.query("SELECT id AS value, title AS name FROM roles"),
  ])
    .then((result) => {
      const departments = result[0][0];
      console.log(departments);
      return inquirer.prompt([
        {
          type: "input",
          name: "role",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department",
          message: "Which department does the role belong to?",
          choices: departments,
        },
      ]);
    })
    .then((data) => {
      console.log(data);

      const addInfo = `INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?);`;
      return connection.query(addInfo, [
        data.role,
        data.department,
        data.salary,
      ]);
    })
    .then(function (results) {
     console.log(
       `${data.role} has been added to the database!`
     );
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { viewRoles, addRole };
