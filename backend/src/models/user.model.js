import {model,Schema} from "mongoose";

const userSchema =new Schema(
    {
        email: {
            type: String,
          },
          name:{
            type:String,
          }

    }
)

const User = model("users", userSchema);

export default User;

