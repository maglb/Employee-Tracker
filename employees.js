const express = require("express");
const inquirer = require("inquirer");

// See all employees
const viewEmployees = (connection) => {
  const allEmployees = `SELECT a.id, a.first_name, a.last_name, roles.title, roles.salary,
CONCAT(b.first_name," ", b.last_name) AS manager 
FROM employees AS a
LEFT JOIN employees AS b ON a.manager_id = b.id
JOIN roles ON a.role_id = roles.id;`;

  return connection
    .query(allEmployees)
    .then(function (results) {
      console.table(results[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add New Employee
const newEmployee = (connection) => {
  // Get data for all roles and concat first and last name of current employees
  return Promise.all([
    connection.query("SELECT id AS value, title AS name FROM roles"),
    connection.query(
      "SELECT id AS value, CONCAT (first_name, ' ', last_name) AS name FROM employees"
    ),
  ])
    .then(([[roles], [employees]]) => {
      // const roles = result[0][0];
      // const employees = result[1][0];

      // Add option 'None' to managers
      employees.push({
        name: "None",
        value: null,
      });
      // console.log(roles);
      // console.log(employees);

      // Collect data about new employee
      return inquirer.prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the new employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the new employee's last name?",
        },
        {
          type: "list",
          name: "role",
          choices: roles,
        },
        {
          type: "list",
          name: "manager",
          choices: employees,
        },
      ]);
    })
    .then((data) => {
      // console.log(data);
      // Insert new data into employees table
      const addInfo = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;

      // other way to do it:
      //const addInfo = `INSERT INTO employees SET ?`;
      //   connection
      // .query(addInfo, data)

      return connection.query(addInfo, [
        data.first_name,
        data.last_name,
        data.role,
        data.manager,
      ]);
    })
    .then(function () {
      // console.table(results[0]);
      console.log(
        `New employee has been added to the database!`
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { viewEmployees, newEmployee };
