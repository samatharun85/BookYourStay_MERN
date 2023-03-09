import User from "../models/User.js"
import { createError } from "../utils/error.js";

export const createUser=async(req,res,next)=>{
  const {username,email,phone,password,img}=req.body
  const newUser= new User({
    username,email,phone,password,img

  })
  newUser.save((err)=>{
    if(err){
      return next(createError(400, "Error creating"));
    }
  })
}

export const updateUser=async(req,res,next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err)
    }
}
export const deleteUser=async(req,res,next)=>{
  try {
      await User.findByIdAndDelete(
        req.params.id
      );
      res.status(200).json("User Has been deleted");
    } catch (err) {
      next(err)
  }
}
export const getUser=async(req,res,next)=>{
    try {
        const user = await User.findById(
          req.params.id
        );
        res.status(200).json(user);
      } catch (err) {
        next(err)
    }
}
export const getUsers=async(req,res,next)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        next(err)
    }
}