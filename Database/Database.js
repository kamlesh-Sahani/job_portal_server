const mongoose =  require('mongoose');

const DbConnect =async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`mongoDB is connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`mongoDB connection error : ${error}`)
    }
}


module.exports = DbConnect;