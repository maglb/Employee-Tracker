const express = require("express");

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

module.exports = { viewRoles };
