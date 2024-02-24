const express = require("express");

// See all departments
const viewDepartments = (connection) => {
  const allDepartments = `SELECT * FROM departments;`;

  connection
    .query(allDepartments)
    .then(function (results) {
      console.table(results[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { viewDepartments };
