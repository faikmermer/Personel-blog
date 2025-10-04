import { Request, Response, NextFunction } from 'express';


export function authMiddleware(req : Request, res: Response, next : NextFunction) {
    
    if(req.cookies['password'] === "1234" && req.cookies['username'] === "admin"){
        next();
    }else{
        res.redirect('/login');
    }
}
