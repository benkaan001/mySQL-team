//==============Dependencies==================
// import mysql2 to connect to the MySQL database
const mysql = require('mysql2');

// mySQL PATH =====> /usr/local/mysql/bin/mysql -uroot -p

const inquirer = require('inquirer');
const consoleTable = require('console.table');


// import EX to create a connection to the Express.js server to host the application
const express = require('express');


// add the PORT designation and the app expression 
const PORT = process.env.PORT || 3001;
const app = express();

// add the Express.js middleware
app.use(express. urlencoded({ extended: false}));
app.use(express.json());



// connect the applicaiton to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'atakaan1',
    database:'mySQL_team'
},
console.log ('Connected to the mySQL_team database.')
);



// add a route that handles requests that are not supported by the app

app.use((req,res) => {
    res.status(404).end();
});

// add the function that will start the Express.js server on port 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});




//========inquirer prompts =====================

const promptUser = (response) => {
    return inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "Welcome! Please select one of the options to proceed:",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add A Department",
                "Add A Role",
                "Add An Employee", 
                "Update An Employee Role",
                "View Employees By Manager",
                "View Employees By Department",
                "Quit Application"
            ]
        }
    ]).then (response => {
        console.log(response.userChoice);

        switch (response.userChoice){
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add A Department":
                addDepartment();
                break;
            case "Add A Role":
                addRole();
                break;
            case "Add An Employee":
                addEmployee();
                break;
            case "Update An Employee Role":
                updateEmployee();
                break;
            case "View Employees By Manager":
                viewEmployeesByManager();
                break;
            case "View Employees By Department":
                viewEmployeesByDepartment();
                break;
            case "Quit Application":
                db.end((err) => {
                    if(err){
                        console.log('error: ' + err.message);
                    } else{
                        console.log ('Thank you for visiting mySQL_team!\n\Have a great day!');
                        process.exit();
                    }
                });
               
            
                
        }
    })
}


//===== Prompt Functions ====//

viewAllDepartments =() => {
    db.query(`SELECT*FROM departments`, (err, res) => {
        if(err){
            console.log(err);
        }else{
        console.table(res);
        promptUser();
        }
    });
};

viewAllRoles =() => {
    db.query(`SELECT*FROM roles`, (err,res) => {
        if(err){
            console.log(err);
        }else{
            console.table(res);
            promptUser();
        }
    });
};

viewAllEmployees =() => {
    db.query(`SELECT*FROM employees`, (err,res) => {
        if(err){
            console.log(err);
        }else{
            console.table(res);
            promptUser();
        }
    });
};

addDepartment = () => {
    inquirer.prompt([{
        type:"input",
        name:"newDepartment",
        message: "Please enter the name of the new department:",
        validate: (userInput) => {
            if(userInput){
                return true;
            }else{
                console.log("Please enter a new department name!");
                return false;
            }
        } 
    }]).then( response => {
        db.query(`INSERT INTO departments (name) VALUES (?)`, [response.newDepartment], (err,res) =>{
                     if (err){
                         console.log(err);
                     }else{
                         console.table(res);
                         promptUser();
                     }
                 })
    })
};

addRole = () =>{
    inquirer.prompt([
        {
        type:"input",
        name:"newRoleName",
        message: "Please enter the name of the new role:",
        validate: (userInput) => {
            if(userInput){
                return true;
            }else{
                console.log("Please enter a valid role name!");
                return false;
            };
        },
        
    },
    {
        type:"number",
        name:"newRoleSalary",
        message: "Please enter the salary amount for the new role: ",
        validate: (userInput) =>{
            if(isNaN(userInput)){
                console.log("Please enter a valid numeric value for salary!");
                return false;
            }else{
                return true;
            };
        }

    },
    {
        type:"number",
        name:"newRoleDepartmentId",
        message: "Please enter the department ID for the new role: ",
        validate: (userInput) =>{
            if(isNaN(userInput))
            if(userInput > 5 || userInput < 1) {
                console.log("Please enter a valid numeric value between 1 and 5 for the Department ID!");
                return false;
            }else{
                return true;
            }
        }

    }]).then ( response => {
        db.query(`INSERT INTO roles (title, salary, department_id) 
                VALUES (?, ?, ?)`, [response.newRoleName, response.newRoleSalary, response.newRoleDepartmentId], (err,res) => {
            if(err){
                console.log(err);
            } else{
                console.table(res);
                promptUser();
            }
        })
    });
};

addEmployee = () => {

    inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "Please enter the new employee's first name:",
            validate: (userInput) => {
                if(userInput){
                    return true;
                }else{
                    console.log("Please enter a valid role name!");
                    return false;
                };
            },
        },
        {
            type: "input",
            name: "last",
            message: "Please enter the new employee's last name:",
            validate: (userInput) => {
                if(userInput){
                    return true;
                }else{
                    console.log("Please enter a valid role name!");
                    return false;
                };
            },
        },
        {
            type:"text",
            name:"roleId",
            message: "Please enter the new employee's role ID# : ",
            validate: (userInput) =>{
                if(isNaN(userInput)){
                    console.log("Please enter a valid numeric value between 1 and 5 for the Role ID!");
                    return false;
                }
                else if(userInput > 5 || userInput < 1) {
                    console.log("Please enter a valid numeric value between 1 and 5 for the Role ID!");
                    return false;
                }else{
                    return true;
                }
            }
        },
        {
            type:"text",
            name:"managerId",
            message: "Please enter the new employee's manager's ID# : ",
            validate: (userInput) =>{
                if(isNaN(userInput)){
                    console.log("Please enter a valid numeric value between 1 and 5 for the Role ID!");
                    return false;
                }
                else if(userInput > 5 || userInput < 1) {
                    console.log("Please enter a valid numeric value between 1 and 5 for the Manager ID!");
                    return false;
                }else{
                    return true;
                }
            }
        }        
       
    ]).then(response => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`, [response.first, response.last, response.roleId, response.managerId], (err,res) => {
                    if(err){
                        console.log(err);
                    }else {
                        console.table(res);
                        promptUser();
                    }
                })
    })
};

updateEmployee = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "updateEmployee",
            message: "Please select the employee you would like to make changes to: ",
            choices : [
                'Captain',
                'Veda',
                'Bilkem',
                'Matt',
                'Sue',
                'Sara',
                'Manuel',
                'Zackery',
                'Isabel',
                'Noe'
            ]
            
        },
        {
            type:'list',
            name: "newRole",
            message: "Please select the department id for the new role: \n\
             [1] Super Hero \n\
             [2] Sales Associate \n\
             [3] IT \n\
             [4] Finance \n\
             [5] HR",
            choices: [1,2,3,4,5]

        }
    ]).then(response => {
        db.query(`UPDATE employees SET role_id = ? WHERE first_name = ? `,
                 [response.newRoleId, response.updateEmployee], (err, res) => {
                     if(err){
                         console.log(err);
                     } else {
                         console.table(res);
                         promptUser();
                     }
                 })
    })

};

viewEmployeesByManager = () => {
    inquirer.prompt([
        {
            type:"list",
            name:"managerId",
            message: "Please select the manager ID: \n\
            [1] Captain America @ Super Hero \n\
            [3] Matt Huynh @ IT \n\
            [4] Sue Liu @ Finance\n\
            [5] Sara Al @ HR ",
            choices:[1,3,4,5]
        }
    ]).then (response => {
        db.query(`SELECT * FROM employees WHERE manager_id = ?`, [response.managerId], (err,res) =>{
            if (err){
                console.log(err);
            }else{
                console.table(res);
                promptUser();
            }
        })
    })
};

viewEmployeesByDepartment = () => {
    inquirer.prompt([
        {
            type: "checkbox",
            name:"departmentId",
            message:"Please select the department ID: \n\
            [1] Super Hero \n\
            [2] Sales \n\
            [3] IT\n\
            [4] Finance\n\
            [5] HR ",
            choices:[1,2,3,4,5]
        }
    ]).then(response => {
        db.query(`SELECT * FROM employees, roles WHERE employees.role_id = roles.department_id = ?`,
                [response.departmentId], (err, res) => {
            if(err){
                console.log(err);
            }else{
                console.table(res);
                promptUser();
            }
        })
    })
}

promptUser();



