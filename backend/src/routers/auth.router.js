import { Router } from "express";
import { BAD_REQUEST } from "../constants/httpStatus.js";
import { UserModel } from '../models/user.model.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS = 10;

const router = Router();
  
  router.post('/register', async(req, res) => {
     const{name, email, password, confirmPassword, address} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        res.status(BAD_REQUEST).send('User already exist, please login or use a different email');
        return;
      }
      const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS);
       const newUser = {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        address,
      };
      const result = await UserModel.create(newUser);
    res.send(generateTokenResponse(result));
  });


router.post('/login', async(req, res, next) => {
   const {email, password} = req.body;
    const user = await UserModel.findOne({email});
     if(user && (await bcrypt.compare(password.user.password))){
      res.send(generateTokenResponse(user));
      return;
     }
     res.status(BAD_REQUEST).send('Invalid Username and Password');
});


// generating the token from the jsonwebtoken and the JWT_SECRET is found in the .env file that contains some random text that prevents attack into the server

  const generateTokenResponse = user => {
    const token = jwt.sign(
      {
        id: user.id,
        email:user.email,
        isAdmin: user.isAdmin,
        role: user.role,
    }, 
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
    );
  
    return{
      id: user.id,
      email:user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      role: user.role,
      token,
    }
  };
  

export default router;