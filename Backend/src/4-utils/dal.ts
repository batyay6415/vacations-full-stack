import mysql from "mysql";
import appConfig from "./app-config";

// Create a connection to MySQL's vacations database:
const connection = mysql.createPool({
    host: appConfig.mySqlHost,
    user: appConfig.mySqlUser,
    password: appConfig.mySqlPassword,
    database: appConfig.mySqlDatabase
});

// Execute any sql: 
function execute(sql: string, values?: any[]): Promise<any> {

    // Promisify:
    return new Promise<any>((resolve, reject) => {

        // Execute query in database:
        connection.query(sql, values, (err, result) => {

            // If query failed:
            if (err) {
                reject(err);
                return;
            }

            // Query succeeded:
            resolve(result);

        });
    });
}

export default {
    execute
};