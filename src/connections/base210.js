import { createPool } from 'mysql2';
import dotenv from 'dotenv';

//para que busque y aplique el env
dotenv.config({ path: '.env' }); //situar siempre en la raiz nunca en otra carpeta si no no agarra

const pool = createPool({

	'host':'10.160.36.210',
	'user' : process.env.DB_USER_210,
	'password' : process.env.DB_PASS_210,
	"database" : "ccs",
	"port": 3306

});

//leer:
const select = (sql) =>{
	return new Promise( (resolve,reject) => {
		pool.query(sql,(err,rows)=>{
	    if(err){
	    	console.log(err);
	      return reject(0)
	    }
	    resolve(rows)
	  });
	});
}

//insert:
 const insert = (sql)=>{
    return new Promise((resolve, reject)=>{
      pool.query(sql,(err, result)=>{
        if(err){
        	console.log(err);
          	return reject(0)
        }
        resolve(result.affectedRows)
      });
    });
 }

 //update:
 const update = (sql)=>{
    return new Promise((resolve, reject)=>{
      pool.query(sql,(err, result)=>{
        if(err){
        	console.log(err);
          	return reject(0)
        }
        resolve(result.affectedRows)
      });
    });
 }

 //deletee:
 const deleteReg = (sql)=>{
    return new Promise((resolve, reject)=>{
      pool.query(sql,(err, result)=>{
        if(err){
        	console.log(err);
          	return reject(0)
        }
        resolve(result.affectedRows)
      });
    });
 }

//getlasId : using insert:
const lastIdInsert = (sql)=>{
    return new Promise((resolve, reject)=>{
      pool.query(sql,(err, result)=>{
        if(err){
        	console.log(err);
          	return reject(0)
        }
        resolve(result.insertId)
      });
    });
 }


export {
	select,
	deleteReg,
	insert,
	lastIdInsert,
	update
}
