const inquirer = require('inquirer');
const { viewEmployees } = require('./employees');
const express = require('express');
const mysql = require('mysql2/promise');

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const startApp = () => {
  return inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'options',
      choices: ['View All Employees', 'Add An Employee', 'Update An Employee Role', 'View All Roles', 'Add A Role', 'View All Departments', 'Add A Department', 'Exit']
    },
  ])
};

// TODO: Create a function to initialize app
function init() {
  startApp()
    .then((data) => {
      switch (data.options) {
        case 'View All Employees':
          return viewEmployees()
          break;
        case 'Add An Employee':
          return addEmployee()
          break;
        case 'Update An Employee Role':
          return updateEmployee()
          break;
        case 'View All Roles':
          return viewRoles()
          break;
        case 'Add A Role':
          return addRole()
          break;
        case 'View All Departments':
          return viewDepartments()
          break;
        case 'Add A Department':
          return addDepartment()
          break;
        case 'Exit':
          return exit()
          break;
      }
    })
    .catch((err) => console.error(err));
};

// Function call to initialize app
init();
