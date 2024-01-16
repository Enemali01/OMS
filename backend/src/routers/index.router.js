import { Router } from "express";

const router = Router();

  router.get('/', (req,res,next) => {
    res.send('Index is working')
  });
  
export default router