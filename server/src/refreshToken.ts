import { Response } from "express";

export const refreshToken = (res: Response, token: String) => {
  res.cookie("rick", token, {
    httpOnly: true,
    path: "/refresh_token"
  })
}