const express = require("express")
const app = express()
const authroute = require('./routes/user_routes')
const bodyparser = require('body-parser')
const swaggerUi=require('swagger-ui-express');
const swaggerDocument=require('./swagger.json');
const port = process.env.PORT || 3000

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use('/auth',authroute)




require('./config/db')

 

app.listen(port, ()=>{
    console.log(`
    ################################################
    🛡️  Server listening On Port: 3000 🛡️
    ################################################
  `);    
  });
