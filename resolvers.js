
import mongoose, { Error } from 'mongoose'


import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'
// import { JWT_SECRET } from './config.js'


const User = mongoose.model('User')
const Quote = mongoose.model('Quote')

const resolvers = {
    Query:{
        users:async()=> await User.find({}),
        user:async(_,{_id})=>await User.findOne({_id}),//users.find(user=>user._id == _id),
        quotes:async()=>await Quote.find({}).populate("by","_id firstname"),
        userquotes:async(_,{by})=> await Quote.find({by}),//quotes.filter(quote=>quote.by == by)
        myprofile:async(_,args,{userId})=>{
            if(!userId) throw new Error ("you must be login")
            return await User.findOne({_id:userId})
        }

       
    },

    User:{
        quotes:async(ur)=> await Quote.find({by:ur._id})//quotes.filter(quotes=>quotes.by == ur._id)
    },

    Mutation:{
        signupUser:async(_,{UserNew})=>{
            const user = await User.findOne({email:UserNew.email})
            if(user){
                throw new Error("user already exits with that email")
            }
           const hashedPassword = await bcrypt.hash(UserNew.password,12)

          const newuser =  new User({
            ...UserNew,
            password:hashedPassword
           })

           return await newuser.save()
        },

        signinUser:async(_,{UserSignin})=>{

            const user = await User.findOne({email:UserSignin.email})
            if(!user){
                throw new Error("user doesent exits with that email")
            }

            const doMatch = await bcrypt.compare(UserSignin.password,user.password)
            if(!doMatch){
                throw new Error("email or password is wrong")
            }

            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
            return {token}
        },


        createQuote:async(_,{name},{userId})=>{

            if(!userId) throw new Error ("you must be login")
            const newQuote = new Quote({
                name,
                by:userId
            })

           await newQuote.save()
           return "Quate sve successfully"

        }
    }
}


export default resolvers