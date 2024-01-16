import { Router } from "express";

const router = Router();

  router.get('/profile', (req,res,next) =>{
      res.send('Profile')
  })
  
  export default router;