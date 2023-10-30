const inquirer = require('inquirer');

const { addDepartment, addEmployee, addRole } = require('./utils/create');
const { viewTotalUtilizedBudgetOfDepartment, viewData } = require('./utils/read');
const { updateEmployeeRole} = require('./utils/update');
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
                "View the total utilized budget of a department",
                "Exit",
            ]
        })
        .then(async (choice) => {
            switch (choice.action) {
                case "View all departments":
                    console.table(await viewData(db, 'department'));
                    init();
                    break;
                case "View all roles":
                    console.table(await viewData(db, 'role'));
                    init();
                    break;
                case "View all employees":
                    console.table(await viewData(db, 'employee'));
                    init();
                    break;
                case "Add a department":
                    await addDepartment(db);
                    init();
                    break;
                case "Add a role":
                    await addRole(db);
                    init();
                    break;
                case "Add an employee":
                    await addEmployee(db);
                    init();
                    break;
                case "Update an employee role":
                    await updateEmployeeRole(db);
                    init();
                    break;
                case "View the total utilized budget of a department":
                    console.table(await viewTotalUtilizedBudgetOfDepartment(db));
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
