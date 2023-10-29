INSERT INTO department (name)
VALUES
('Service'),
('Sales'),
('Detail');

INSERT INTO role (title, salary, department_id)
VALUES
('Service Manager', 150000.00, 1),
('Service Advisor', 85000.00, 1),
('Technician', 75000.00, 1),
('General Manager', 300000.00, 2),
('Sales Manager', 125000.00, 2),
('Salesman', 90000.00, 2),
('Detail Manager', 55000.00, 3),
('Detailer', 45000.00, 3),
('Porter', 35000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Don', 'B', 1, NULL),
('Cathy', 'C', 2, NULL),
('Jose', 'G', 3, NULL),
('Rusty', 'J', 4, NULL),
('Raul', 'R', 5, NULL),
('Anthony', 'M', 6, NULL),
('Jeff', 'M', 7, NULL),
('Mike', 'J', 8, NULL),
('Cuba', 'G', 9, NULL);
