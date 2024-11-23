import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");
  if (!token) {
    res.status(404).json({ error: "Access denied" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded !== "object" || !decoded?.id) {
      res.status(404).json({ error: "Access denied" });
      return;
    }
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(401).json({ error: "Access denied" });
  }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");
    if (!token) {
      res.status(404).json({ error: "Access denied" });
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      if (typeof decoded !== "object" || !decoded?.id) {
        res.status(404).json({ error: "Access denied" });
        return;
      }
      if(decoded?.role !== 'seller'){
        res.status(404).json({ error: "You don't have access" });
        return;
      }
      req.userId = decoded.id;
      next();
    } catch (e) {
      res.status(401).json({ error: "Access denied" });
    }
  }
