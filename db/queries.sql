
-- Combine roles and department tables
SELECT roles.id, roles.title, departments.department_name, roles.salary
FROM roles
JOIN departments ON departments.id = roles.department_id;

SELECT a.id, a.first_name, a.last_name, roles.title, roles.salary,
-- Combine first and last name of the employees and set them under manager
CONCAT(b.first_name," ", b.last_name) AS manager 
-- Diplay the full name of the manager in lieu of manager_id
FROM employees AS a
LEFT JOIN employees AS b ON a.manager_id = b.id
JOIN roles ON a.role_id = roles.id;






