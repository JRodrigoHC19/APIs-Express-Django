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

const getOneChannel = async (id) => {
    const statement = `
        SELECT *
        FROM account_qrcode 
        WHERE user_id = ?;
    `;
    const [query] = await connection.execute(statement, [id]);
    return query;
}

const postOneChanel = async (id, name) => {
    const statement = ` 
        INSERT INTO account_qrcode (user_id, nameChannel) 
        VALUES (?, ?);
    `;
    const [query] = await connection.execute(statement, [id, name]);
    return query;
}



module.exports = {
    getAllTasks,
    getOneTasks,
    getOneChannel,
    postOneChanel
};
