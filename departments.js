const express = require("express");
const inquirer = require("inquirer");

// See all departments
const viewDepartments = (connection) => {
  const allDepartments = `SELECT * FROM departments;`;

  return connection
    .query(allDepartments)
    .then(function (results) {
      console.table(results[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get data about new role
const addDepartment = (connection) => {
  // Get data for all roles
  return Promise.all([
    connection.query(
      "SELECT id AS value, department_name AS name FROM departments"
    ),
  ])
    .then((result) => {
      const departments = result[0][0];
      // console.log(departments);
      return inquirer.prompt([
        {
          type: "input",
          name: "department",
          message: "What is the name of the department?",
        },
      ]);
    })
    .then((data) => {
      // console.log(data);

      const addInfo = `INSERT INTO departments (department_name) VALUES (?);`;
      return connection.query(addInfo, [data.department]);
    })
    .then(function () {
      console.log(`New department has been added to the database!`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { viewDepartments, addDepartment };
