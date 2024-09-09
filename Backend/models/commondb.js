const mysql=require('mysql2/promise');

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Mahadeva@18',
    database:'Bankdb',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})   

const  verifyConnection=async()=>{
    try{
        const checkConnection=await pool.getConnection();
        checkConnection.query('select 1');
        console.log('Database is Connected Successfully');
        checkConnection.release()
    
    }
        catch(err)
        {
            console.log('There might be an issue with database')
        }
}

module.exports={pool,verifyConnection};