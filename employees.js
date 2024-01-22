
const express = require('express');
const { db } = require('./config/connection');
// See all employees
const viewEmployees = () => {
    const allEmployees = `SELECT a.id, a.first_name, a.last_name, roles.title, roles.salary,
CONCAT(b.first_name," ", b.last_name) AS manager 
FROM employees AS a
LEFT JOIN employees AS b ON a.manager_id = b.id
JOIN roles ON a.role_id = roles.id;`;

console.log(allEmployees);
    db.query(allEmployees, function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    })
};

module.exports = { viewEmployees };

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
