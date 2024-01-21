INSERT INTO departments (department_name)
VALUES ("Finance"),
       ("Engineering"),
       ("Sales"),
       ("Legal"),
       ("Creative");

       INSERT INTO roles (title, department_id, salary)
VALUES ("Software Engineer", 2, 120000),
       ("Account Manager", 1, 160000),
       ("Accountant", 1, 125000),
       ("Legal Team Lead", 4, 250000),
       ("Lawyer", 4, 190000),
       ("Lead Software Engineer", 2, 250000),
       ("Creative Director", 5, 250000),
       ("Senior Designer", 5, 100000),
       ("Copy Writer", 5, 110000),
       ("Sales Lead", 3, 110000),
       ("Salesperson", 3, 110000)

       INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Meyer", 1, 6),
       ("Julia", "White", 2, NULL),
       ("Robert", "Smith", 3, 1),
       ("Jessica", "Spears", 4, NULL),
       ("Peter", "McDonals", 5, 4),
       ("Briana", "Lowel", 6,  NULL),
       ("Katherine", "Grey", 7,  NULL),
       ("Bryan", "Ruth", 8, 7),
       ("Hannah", "Gold", 3, 7)

       
