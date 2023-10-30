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

    // const [managers] = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee');
    const managers = await getData(db, 'employee');
    // const [roles] = await db.query('SELECT id, title FROM role');
    const roles = await getData(db, 'role');

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
        
        let role_id = res.role_id.split(':')[0].trim();
        let manager_id = res.manager_id.split(':')[0].trim();

        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ("${res.firstName}", "${res.lastName}", ${role_id}, ${manager_id})`

        db.execute(query);
        console.log('Employee added');
    })
};

const getData = async (db, req) => {
    let [res] = [];
    let choices = [];

    switch(req) {
        case 'role':
            [res] = await db.execute('SELECT * FROM role');
            choices = res.map((res) => `${res.id}: ${res.title}`);
            break;
        case 'employee':
            [res] = await db.execute('SELECT * FROM employee');
            choices = res.map((res) => `${res.id}: ${res.first_name} ${res.last_name}`);
            break;
    }
    return choices;
}

module.exports = {addDepartment, addRole, addEmployee, getData};