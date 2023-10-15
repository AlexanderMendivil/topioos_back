import {Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ message: "You are not allow here"});
  
    jwt.verify(token, process.env.SECRET_KEY!, (err: any, user: any) => {
      if (err) return res.status(403).json({message: "Unathorized"});
      next();
    });
  }