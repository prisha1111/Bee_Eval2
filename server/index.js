const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('../server/db/dbConnection');
const userRouter = require('./routers/userRouter')
const expenseRouter = require('./routers/expenseRouter')
const app = express();
dotenv.config();
const chatRouter = require('./routers/chatRouter'); 

app.use(cors());
app.use(express.json());
app.use('/auth',userRouter)
app.use('/expenses',expenseRouter)
app.use('/chat', chatRouter);
connectDb();

const port =  process.env.PORT_NO || 4000 ;
app.listen(port , ()=>{
        console.log(`Server on :- ${port}`);
})