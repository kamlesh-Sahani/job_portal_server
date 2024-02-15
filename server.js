const app = require('./app');
const DbConnect = require('./Database/Database');
const PORT= process.env.PORT || 8800 ;
// database connection 
DbConnect();
app.use('/',(req,res)=>{
res.send("Welcome")
})
app.listen(PORT,()=>{
    console.log(`server is running on http//localhost:${PORT}`);
})