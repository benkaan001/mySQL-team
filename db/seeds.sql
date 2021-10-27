
INSERT INTO departments (name)
VALUES
('Fun-to-see'),
('Sales'),
('Technology'),
('Finance'),
('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
('Super Hero', 999999, 1),
('Sales Associate', 150000, 2),
('IT Director', 250000, 3),
('IT Engineer', 200000, 3),
('Finance Director', 150000, 4),
('Finance Associate', 100000, 4),
('HR Director', 150000, 5),
('HR Associate', 100000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Captain', 'America', 1, NULL),
    ('Veda', 'Inan',2, 1),
    ('Bilkem', 'Ozcan',2, 1),
    ('Matt', 'Hyun',3, NULL),
    ('Sue', 'Liu',4, NULL),
    ('Sara', 'Al', 5, NULL),
    ('Manuel', 'Murillo', 5, 5),
    ('Zackery', 'McPike', 3, 3),
    ('Isabel', 'Portales', 4, 4),
    ('Noe', 'Zuniga', 5, 5);
