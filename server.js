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


// //query the database to test the connection
// //get an employee
// db.query(`SELECT * FROM employees WHERE id=1`, (err, rows) => {
//     if(err) {
//         console.log(err); // should return null if not run sql source 
//     }
//     console.log(rows);
// });

// get a single employee

// app.get('/api/employees/:id', (req,res) => {
//     const sql = `SELECT * FROM employees WHERE id=?`;
//     const params = [req.params.id];

//     db.query(sql,params, (err,row) => {
//         if(err){
//             res.status(400).json({ error: err.message});
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: row
//         });
//     });
// });

// //delete an employee
// db.query('DELETE FROM employees WHERE id=?', 1, (err, result) => {
//     if(err){
//         console.log(err);
//     }
//     console.log(result);
// });


// //delete an employee
// app.delete('/api/employees/:id', (req,res) =>  {
//     const sql = `DELETE FROM employees WHERE id =?`;
//     const params = [req.params.id];
//     db.query(sql,params, (err,result) => {
//         if(err) {
//             res.status(400).json( { message: res.message});
//         } else if (!result.affectedRows){
//             res.json({
//                 message: 'Employee not found'
//             });
//         }else {
//             res.json({
//                 message: 'success',
//                 changes: result.affectedRows,
//                 id: req.params.id
//             });
//         }
//     });
// });

// //create an employee
// const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
//             VALUES (?,?,?,?)`;
// const params = ['Ben', 'Kaan', 1, null];
// db.query(sql,params,(err,result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// //create an employee
// app.post('/api/employees', ({body},res) => {
//     const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
//                 VALUES (?,?,?,?)`;
//     const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    
//     db.query(sql,params, (err, result) => {
//         if (err){
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: body
//         });
//     });
   
// });


// //test the route

// app.get('/', (req,res) => {
//     res.json({
//         message: 'I am working!!'
//     });
// });

// // get all employees
// app.get('/api/employees', (req,res) => {
//     const sql = `SELECT * FROM employees`;

//     db.query(sql, (err,rows) => {
//         if(err) {
//             res.status(500).json( {error: err.message});
//             return;
//         }
//         //instead of logging the result rows from the database
//         //we are sending the message as a JSON object to the browwerser
//         //using <res> in the Express.js route callback
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

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
                "Update An Employee Role"
            ]
        }
    ]).then (response => {
        console.log(response.userChoice);
        // if(response.userChoice === "View All Departments"){
        //     viewAllDepartments = () => {
        //         db.query('SELECT*FROM departments', (err, res) => {
        //             console.table(res);
        //             promptUser();
        //         })
        //     }
        // }

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
                ('Captain'),
                ('Veda'),
                ('Bilkem'),
                ('Matt'),
                ('Sue'),
                ('Sara'),
                ('Manuel'),
                ('Zackery'),
                ('Isabel'),
                ('Noe')
            ]
            
        },
        {
            type:'list',
            name: "newRole",
            message: "Please select the new role: ",
            choices: [
                ('Super Hero'),
                ('Sales Associate'),
                ('IT Director'),
                ('IT Engineer'),
                ('Finance Director'),
                ('Finance Associate'),
                ('HR Director'),
                ('HR Associate')
            ]

        }
    ]).then(response => {
        db.query(`UPDATE employees SET roles_title = ? WHERE first_name = ? `,
                 [response.newRole, response.updateEmployee], (err, res) => {
                     if(err){
                         console.log(err);
                     } else {
                         console.table(res);
                         promptUser();
                     }
                 })
    })

}

promptUser();



