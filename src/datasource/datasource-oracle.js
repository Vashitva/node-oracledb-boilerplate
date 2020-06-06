const util = require('../util/util')
const oracledb = require('oracledb') 
const SimpleOracleDB = require('simple-oracledb') 
SimpleOracleDB.extend(oracledb);

const createPool = async (config) => {
    const dbPoolName = config.poolAlias;
    try {
            if (util.isEmptyString(dbPoolName)) 
        {
            throw new Error(`dbPoolName can not be empty`);
        }
        let dbPool = getPool(dbPoolName);
        if (!dbPool) {
            const dbPoolConfig = {...config};
            dbPool = await oracledb.createPool(dbPoolConfig);
            console.log(`Successfully created pool for poolName - ${dbPoolName}`);
        }
        return dbPool;
    } catch (err) {
        console.log(`Error while creating pool for ${dbPoolName}`);
        throw err;
    }
}

const getPool = (poolName, throwError = false) => {
    let dbPool;
    try {
        dbPool = oracledb.getPool(poolName);
    } catch(err) {
        console.log(`Error while getting dbPool`);
        if(throwError) {
            throw err;
        }
    }
    return dbPool;
}

module.exports = {createPool, getPool};