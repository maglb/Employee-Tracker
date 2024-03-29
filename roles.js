const express = require("express");
const inquirer = require("inquirer");

// See all roles
const viewRoles = (connection) => {
  const allRoles = `SELECT roles.id, roles.title, departments.department_name, roles.salary
FROM roles
JOIN departments ON departments.id = roles.department_id
ORDER BY roles.id ASC;`;

  return connection
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
    connection.query(
      "SELECT id AS value, department_name AS name FROM departments"
    ),
  ])
    .then((result) => {
      const departments = result[0][0];
      // console.log(departments);

      // Collect data about the new role
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
      // console.log(data);
      // Insert new data into the table roles
      const addInfo = `INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?);`;
      return connection.query(addInfo, [
        data.role,
        data.department,
        data.salary,
      ]);
    })
    .then(function () {
      console.log(`New role has been added to the database!`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update an Employee's role

const updateRole = (connection) => {
  // Get data for all roles and employees' name
  return Promise.all([
    connection.query("SELECT id AS value, title AS name FROM roles"),
    connection.query(
      "SELECT id AS value, CONCAT (first_name, ' ', last_name) AS name FROM employees"
    ),
  ])
    .then(([[roles], [employees]]) => {

      // Collect data about which employee and which role to update to
      return inquirer.prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's role do you want to update?",
          choices: employees,
        },
        {
          type: "list",
          name: "role",
          message: "Which role do you want to assign the selected employee?",
          choices: roles,
        },
      ]);
    })
    .then((data) => {
      
      // Update role of selected employee
      const updateInfo = `UPDATE employees
SET role_id = ?
WHERE id = ?;`;

      return connection.query(updateInfo, [data.role, data.employee]);
    })
    .then(function () {
      console.log(`Employee's role updated!`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { viewRoles, addRole, updateRole };
