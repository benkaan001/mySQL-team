
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(6,2),
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)

);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INTEGER NULL,
    FOREIGN KEY (manager_id) REFERENCES role(id)
);

INSERT INTO department (name)
VALUES
('Fun-too-see')
('Sales'),
('Technology'),
('Finance'),
('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES
('The Super Hero', 999999, 0),
('Sales Associate', 150000, 1),
('IT Director', 250000, 2),
('IT Engineer', 200000, 2),
('Finance Director', 150000, 3),
('Finance Associate', 100000, 3),
('HR Director', 150000, 4),
('HR Associate', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Captain', 'America',0),
    ('Veda', 'Inan',1,0),
    ('Bilkem', 'Ozcan',1,0),
    ('Matt', 'Hyun',2,0),
    ('Sue', 'Liu',3,0),
    ('Sara', 'Al', 4,0),
    ('Manuel', 'Murillo',4,4),
    ('Zackery', 'McPike'2,2),
    ('Isabel', 'Portales'3,3),
    ('Noe', 'Zuniga',4,4);
