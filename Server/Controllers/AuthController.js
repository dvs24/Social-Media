import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//Registering New User
dotenv.config();

export const registerUser = async(req , res) => {

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password , salt );
    req.body.password = hashPass;
    const newUser = new UserModel(req.body);
    const {username}= req.body;
  

    try {
        const oldUser = await UserModel.findOne({username})
        if(oldUser){
            return res.status(400).json({message : "Username is already registered"})
        }
        const user = await newUser.save()
        const token = jwt.sign(
            {username : user.username, id:user._id},
            process.env.JWT_KEY,
            {expiresIn: '1h'}  )

        res.status(200).json({user, token})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Login User

export const loginUser = async (req, res) =>{
        
    const {username, password} = req.body;
    try {
        const user = await UserModel.findOne({username : username});
        
        if(user){
            const validity = await bcrypt.compare(password, user.password);
            if(!validity){
                res.status(400).json("Password is wrong")
            }
            else{
                const token = jwt.sign(
                    {username : user.username, id:user._id},
                    process.env.JWT_KEY,
                    {expiresIn: '1h'}  )
                    console.log(user);
                res.status(200).json({user, token})
            }
        }
        else{
            return res.status(404).json('User Does Not Exist');
        }

    } catch (error) {
        res.status(500).json({message : error.message});
        
    }
}


