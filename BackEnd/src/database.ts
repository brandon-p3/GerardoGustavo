import mysql from 'promise-mysql';
import keys from './keys';

const poolPromise = mysql.createPool(keys.database);

poolPromise.then(pool => {
    pool.getConnection().then(connection => {
        connection.release(); 
        console.log('DB is connected');
    });
});

export default poolPromise;
