const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('../backend/db/db');
const userRouter = require('./router/userRouter')
const expenseRouter = require('./router/expenseRouter')
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/auth',userRouter)
app.use('/expenses',expenseRouter)
connectDb();

const port =  process.env.PORT_NO || 5000 ;
app.listen(port , ()=>{
        console.log(`Server on :- ${port}`);
})