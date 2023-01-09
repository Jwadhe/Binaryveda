require('dotenv').config()
const mongoose = require('mongoose');
let url = 'mongodb+srv://Jayesh:c19YSJoZK4PVLhV9@cluster0.4sqcbsl.mongodb.net/User_sample?retryWrites=true&w=majority'

// Database connection
mongoose.connect(url, { useNewUrlParser: true ,
     useUnifiedTopology: true,
    })
 .then((result) => {
     console.log('Database connected.')
  }).catch((err) => {
     console.log(`Connection failed ${err}`)
 })
 
 


module.exports = mongoose;