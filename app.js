const path=require('path');
const bodyParser = require('body-parser');
const express=require('express');

const sequelize=require('./model/databaseTable')
const expenseRoutes=require('./routes/expense')

var cors=require('cors');
const app=express();

app.use(cors());
app.use(bodyParser.json({extended:false}));

app.use(expenseRoutes)

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'./','views','404.html'))
})

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });