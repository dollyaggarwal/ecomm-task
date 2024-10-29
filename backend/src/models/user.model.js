import {model,Schema} from "mongoose";

const User =new Schema(
    {
        email: {
            type: String,
          },
          name:{
            type:String,
          }

    }
)

