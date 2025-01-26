const express =require('express')
const app=express();
const  userRouter = require('./routes/user.routes')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config();
const connectToDB = require('./config/db');
connectToDB();

const indexRouter = require('./routes/index.routes')


app.set('view engine','ejs')
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended :true}))


app.get('/',(req,res)=>{
    res.render('index')
})

app.use('/',indexRouter);
app.use('/user',userRouter);
app.listen(3000)