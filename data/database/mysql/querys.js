const connection = require('./client');

const getAllTasks = async () => {
    const [query] = await connection.execute(`
        SELECT id, email, name, is_admin
        FROM account_user 
        WHERE is_admin = 0
    `);
    return query;
}

const getOneTasks = async (id) => {
    const statement = ` 
        SELECT id, email, name, is_admin 
        FROM account_user 
        WHERE is_admin = 0 AND id = ?;
    `;
    const [query] = await connection.execute(statement, [id]);
    return query;
}


module.exports = {
    getAllTasks,
    getOneTasks
};