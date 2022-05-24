const mongoose = require('mongoose');

const dbConnection = async ()=>{

    try {

         await mongoose.connect(process.env.DB_CONN);

         console.log('DB online')
    } catch (error) {
      throw new Error('Error to initiate database');

    }


}

module.exports = {dbConnection}