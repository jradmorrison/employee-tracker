const inquirer = require('inquirer');

const { addDepartment, addEmployee, addRole } = require('./utils/create');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, viewEmployeesByDepartment, viewEmployeesByManager, viewTotalUtilizedBudgetOfDepartment } = require('./utils/read');
const { updateEmployeeRole, updateEmployeeManager } = require('./utils/update');
const { deleteDepartmentsRolesEmployees } = require('./utils/delete');
const connection = require('./utils/connection');

let db;
const connect = async () => db = await connection();
connect();



const init = async () => {
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
        .then(async (choice) => {
            switch (choice.action) {
                case "View all departments":
                    console.table(await viewAllDepartments(db));
                    init();
                    break;
                case "View all roles":
                    console.table(await viewAllRoles(db));
                    init();
                    break;
                case "View all employees":
                    console.table(await viewAllEmployees(db));
                    init();
                    break;
                case "Add a department":
                    addDepartment();
                    init();
                    break;
                case "Add a role":
                    addRole();
                    init();
                    break;
                case "Add an employee":
                    addEmployee();
                    init();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    init();
                    break;
                case "Update employee manager":
                    updateEmployeeManager();
                    init();
                    break;
                case "View Employees by Manager":
                    viewEmployeesByManager();
                    init();
                    break;
                case "View Employees by Department":
                    viewEmployeesByDepartment();
                    init();
                    break;
                case "Delete Departments | Roles | Employees":
                    deleteDepartmentsRolesEmployees();
                    init();
                    break;
                case "View the total utilized budget of a department":
                    viewTotalUtilizedBudgetOfDepartment();
                    init();
                    break;
                case "Exit":
                    db.end();
                    console.log("Goodbye!");
                    break;
            }
        })
}


init();