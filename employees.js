const express = require('express');

// See all employees
const viewEmployees = (connection) => {
    const allEmployees = `SELECT a.id, a.first_name, a.last_name, roles.title, roles.salary,
CONCAT(b.first_name," ", b.last_name) AS manager 
FROM employees AS a
LEFT JOIN employees AS b ON a.manager_id = b.id
JOIN roles ON a.role_id = roles.id;`;

    connection.query(allEmployees)
        .then(function (results) {
            console.table(results[0]);
        }
        )
        .catch((err) => {
            console.log(err);
        })
};

const addEmployees = (connection) => {
  const addInfo = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES (${first_name}, ${last_name}, ${role}, ${manager});`;

  connection
    .query(allEmployees)
    .then(function (results) {
      console.table(results[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};


const newEmployee = () => {
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
      type: "input",
      name: "role",
      message: "What is the new employee's role?",
    },
    {
      type: "input",
      name: "manager",
      message: "What is the new employee's manager?",
    },
  ]);
};

module.exports = { viewEmployees };
