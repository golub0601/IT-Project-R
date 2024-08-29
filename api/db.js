import sql from "mssql"

const config = {
    server : 'localhost',
    port: 1433,
    database : 'db_tender',
    user : 'adminDB',
    password : '123123',
    options : {
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true
    },
};

export const connect = () => sql.connect(config);
export { sql };