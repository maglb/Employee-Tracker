const express = require("express");

// See all departments
const viewDepartments = (connection) => {
  const allDepartments = `SELECT a.id, a.first_name, a.last_name, roles.title, roles.salary,
CONCAT(b.first_name," ", b.last_name) AS manager 
FROM employees AS a
LEFT JOIN employees AS b ON a.manager_id = b.id
JOIN roles ON a.role_id = roles.id;`;

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