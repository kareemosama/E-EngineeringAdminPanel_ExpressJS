const mongoose = require('mongoose')
    
const connectDB = async()=>{
    try{
        //mongoDB connection stirng
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('MongoDB connected :%s',con.connection.host)
    }catch(err){    
        console.log(err)
        process.exit(1)
    }
}
module.exports = connectDB
