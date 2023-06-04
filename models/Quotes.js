import mongoose from "mongoose";

const quotesSchema = new mongoose.Schema({

    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },

})

mongoose.model("Quote",quotesSchema)