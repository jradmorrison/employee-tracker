const inquirer = require("inquirer");

const addDepartment = async (db) => {
    
    const prompt = {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the new department?'
    }
    
    await inquirer.prompt(prompt)
    .then((res) => {
        
        const query = `INSERT INTO department (name)
        VALUES ("${res.departmentName}");`

        db.execute(query);
        console.log('Department added');

    })
};

const addRole = async (db) => {
    
    let [departments] = await db.query('SELECT * FROM department;');

    const addRoleQuestions = [
        {
            type: 'input',
            name: 'title',
            message: `What's the role title?`
        },
        {
            type: 'list',
            name: 'dep_id',
            message: 'Which department does it belong to:',
            choices: departments
        },
        {
            type: 'input',
            name: 'salary',
            message: `What's the salary for this role?`
        }
    ]
    await inquirer.prompt(addRoleQuestions)
    .then((res) => {
        let dep_id = departments.find((department) => department.name === res.dep_id).id;
        console.log(dep_id);

        const query = `INSERT INTO role (title, salary, department_id)
        VALUES ("${res.title}", ${res.salary}, ${dep_id});`

        db.execute(query);
        console.log('Role added');
    })
};

const addEmployee = async (db) => {
// todo: roles and managers choices come back as undefined, but log out just fine
    let [managers] = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
    let [roles] = await db.query('SELECT id, title FROM role');

    console.log(roles, managers);
    const employeeQuestions = [
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the First Name of the new employee?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the Last Name of the new employee?'
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Pick their role:',
                choices: roles
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Pick their Manager:',
                choices: managers
            }
    ]

    await inquirer.prompt(employeeQuestions)
    .then((res) => {
        console.log(res);
    })
};

module.exports = {addDepartment, addRole, addEmployee};