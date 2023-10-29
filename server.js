const inquirer = require('inquirer');
const mysql = require('mysql2');

const { addDepartment, addEmployee, addRole } = require('./utils/create');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, viewEmployeesByDepartment, viewEmployeesByManager, viewTotalUtilizedBudgetOfDepartment } = require('./utils/read');
const { updateEmployeeRole, updateEmployeeManager } = require('./utils/update');
const { deleteDepartmentsRolesEmployees } = require('./utils/delete');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employeetracker_db'
    }
);

db.connect((err) => {
    if (err) console.error(err);
    console.log('Connected to the Employee Tracker database');
    init();
})

const init = () => {
    inquirer
        .prompt({
                type: "list",
                name: "action",
                message: "What would you like to do?",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role",
                    "Update employee manager",
                    "View Employees by Manager",
                    "View Employees by Department",
                    "Delete Departments | Roles | Employees",
                    "View the total utilized budget of a department",
                    "Exit",
                ]
        })
        .then((choice) => {
            switch (choice.action) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    break;
                case "Update employee manager":
                    updateEmployeeManager();
                    break;
                case "View Employees by Manager":
                    viewEmployeesByManager();
                    break;
                case "View Employees by Department":
                    viewEmployeesByDepartment();
                    break;
                case "Delete Departments | Roles | Employees":
                    deleteDepartmentsRolesEmployees();
                    break;
                case "View the total utilized budget of a department":
                    viewTotalUtilizedBudgetOfDepartment();
                    break;
                case "Exit":
                    db.end();
                    console.log("Goodbye!");
                    break;
            }
        })
}
