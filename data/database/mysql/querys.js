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

const createTableQRcode = async () => {
    const statement = `
        CREATE TABLE account_qrcode (
           id bigint NOT NULL AUTO_INCREMENT,
            user_id bigint DEFAULT NULL,
            nameChannel varchar(255) DEFAULT NULL,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            CONSTRAINT account_qrcode_ibfk_1 FOREIGN KEY (user_id) REFERENCES account_user (id)
        );
    `;
    const [query] = await connection.execute(statement);
    return query;
}

module.exports = {
    getAllTasks,
    getOneTasks,
    getOneChannel,
    postOneChanel,
    createTableQRcode
};
