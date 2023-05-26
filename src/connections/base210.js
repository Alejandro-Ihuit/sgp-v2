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
const select210 = (sql) =>{
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
 const insert210 = (sql)=>{
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
 const update210 = (sql)=>{
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
 const deleteReg210 = (sql)=>{
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
const lastIdInsert210 = (sql)=>{
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
	select210,
	deleteReg210,
	insert210,
	lastIdInsert210,
	update210
}
