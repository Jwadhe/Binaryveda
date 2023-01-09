const usermodel = require('../model/user_model')
const bcrypt = require('bcrypt')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')

const { vary } = require('express/lib/response')

//Signup_Api
 async function signup(req,res){
     try{
         //console.log(req)
         

         const signup = joi.object({
             name: joi.string().required(),
             email: joi.string().trim().email().required(),
             password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required(),
             mobile: joi.number().integer().min(10**9).max(10**10 - 1).required(),
             age: joi.number().required(),
             address: joi.string().required()
         })
         const { error } = signup.validate(req.body)
         if(error){
             return res.status(422).send({Message: error.details[0].message})
         }

         const { name, email, password, mobile, age, address } = req.body

         var finduser = await usermodel.findOne({email})

         if(finduser){
             return res.status(422).send({Message:'User Already Exist. Please Login'})
         }

            const salt = bcrypt.genSaltSync(10) 
            const hash = bcrypt.hashSync(password, salt)

         const user = new usermodel ({
             name,
             email: email,
             password: hash,
             mobile,
             age,
             address
         })
         user.save()
         return res.status(200).send({Message:'User Signup Successfully'})

     }
     catch(e){
         //console.log(e)
         return res.status(500).send({Message:`Something Went Wrong, ${e}`})
     }
 }

async function login(req,res){
    //console.log('ll')

    try{
        console.log('successfully login')
        
        const login = joi.object({
            email: joi.string().trim().email().required(),
            password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required()
        })
        const { error } = login.validate(req.body)
        
        if(error){
            return res.status(422).send({Message: error.details[0].message})
        }
        
        const data = { email, password } = req.body
        
        
//console.log('ss',req.body)
        const loginuser = await usermodel.findOne({
            email:email
        })
        //console.log(loginuser)

        if(!loginuser){
            return res.status(422).send({Message:'user not foundddd'})
        }
        //comparing the password singup and login
        const compare = bcrypt.compareSync(password, loginuser.password)
    if (!compare) {
       return res.status(422).send({ Message: 'Please enter valid password.' })
    }
    
    var token = jwt.sign({ id: loginuser.id, email: loginuser.email, name: loginuser.name }, process.env.JWT_SECRET, { expiresIn: '90m' })
    
    // const userid = req.user.id
    //     var {token}=req.body
    // usermodel.findOneAndUpdate(
    //     {
    //         _id: userid
    //     },
        
    //     {token},{new:true}
    // )
    return res.status(200).send({ Message: 'User login successfully.' , Token: token, data  })
    
     
    }
    catch(e){
        //console.log(e)
        return res.status(500).send({Message:`something went wrong, ${e}`})
    }
}


 module.exports = {
     signup,
     login,

 }