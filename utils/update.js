const inquirer = require('inquirer');
const {getData} = require('./create')

const updateEmployeeRole = async (db) => {
    const roles = await getData(db, 'role');
    const employees = await getData(db, 'employee');

    const employeeQuestions = [
        {
            type: 'list',
            name: 'emp_id',
            message: 'Select an employee:',
            choices: employees
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is their new role?',
            choices: roles
        }
    ];

    await inquirer.prompt(employeeQuestions)
    .then((res) => {
        
        const emp_id = res.emp_id.split(':')[0].trim();
        const role_id = res.role_id.split(':')[0].trim();

        const query = `UPDATE employee SET role_id = ? WHERE id = ?;`
        db.query(query, [role_id, emp_id]);
        console.log('Employee role updated!');
    });
};

module.exports = {updateEmployeeRole};
