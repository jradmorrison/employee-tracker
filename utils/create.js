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
    console.log(departments);
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

const addEmployee = async (db) => {};

module.exports = {addDepartment, addRole, addEmployee};