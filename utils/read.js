


const viewAllDepartments = async (db) => {
    const query = 'SELECT * FROM department;';
    const [res] = await db.query(query);
    return res;
};

const viewAllRoles = async (db) => {
    const query = 'SELECT * FROM role;';
    const [res] = await db.query(query);
    return res;
};

const viewAllEmployees = async (db) => {
    const query = 'SELECT * FROM employee;';
    const [res] = await db.query(query);
    return res;
};

const viewEmployeesByManager = async (db) => {};

const viewEmployeesByDepartment = async (db) => {};

const viewTotalUtilizedBudgetOfDepartment = async (db) => {};

module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees, viewEmployeesByDepartment, viewEmployeesByManager, viewTotalUtilizedBudgetOfDepartment};
