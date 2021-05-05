import { Request, Response } from "express";

export type context = {
  req: Request;
  res: Response;
}


// Add which user is logged in to access for tweets