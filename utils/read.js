const viewData = async (db, table) => {
    const query = `SELECT * FROM ${table};`;
    const [res] = await db.query(query);
    return res;
}

const viewTotalUtilizedBudgetOfDepartment = async (db) => {
    const query = `SELECT 
    d.name as "Department",
    sum(r.salary) as "Budget"
FROM
    department d 
INNER JOIN
    role r on r.department_id = d.id 
INNER JOIN 
    employee e on r.id = e.role_id 
group by d.name 
order by Budget DESC`
    const [res] = await db.query(query);
    return res;
};

module.exports = { viewTotalUtilizedBudgetOfDepartment, viewData };
