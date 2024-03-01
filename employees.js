const express = require("express");
const inquirer = require("inquirer");

// See all employees
const viewEmployees = (connection) => {
  const allEmployees = `SELECT a.id, a.first_name, a.last_name, roles.title, roles.salary,
CONCAT(b.first_name," ", b.last_name) AS manager 
FROM employees AS a
LEFT JOIN employees AS b ON a.manager_id = b.id
JOIN roles ON a.role_id = roles.id;`;

  connection
    .query(allEmployees)
    .then(function (results) {
      console.table(results[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addEmployees = (connection, data) => {
  const addInfo = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES ('${data.first_name}', '${data.last_name}', ${data.role_id}, ${data.manager_id});`;

  connection
    .query(addInfo)
    .then(function (results) {
      console.table(results[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

const newEmployee = () => {
  return inquirer
    .prompt([
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
        type: "options",
        name: "role",
        choices: ["Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Lead Software Engineer", "Creative Director", "Copy Writer", "Sales Lead", "Salesperson"],
      },
      {
        type: "options",
        name: "manager",
        choices: ["None", "Briana Lowel", "John Meyer", "Jessica Spears", "Katherine Grey", "Robert Smith", "Peter McDonals", "Bryan Ruth", "Hannah Gold"],
      },
    ])
    .then((data) => {
      addEmployees(data);
    });
};

module.exports = { viewEmployees, addEmployees };
