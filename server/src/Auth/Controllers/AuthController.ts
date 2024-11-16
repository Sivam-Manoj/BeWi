import { Request, Response, RequestHandler, NextFunction } from "express";
import { loginService } from "../service/loginService";
import { AsyncError, biezor } from "biezor";
import { sendTokensAsCookies } from "../../Utils/token/createTokens";

export const login: RequestHandler = biezor(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AsyncError("name and email required");
    }
    try {
      const userId = await loginService(email, password);
      sendTokensAsCookies(res, String(userId));
      res.status(200).json({ message: "Login successful" }); // Send response directly, no need to return it
    } catch (error: any) {
      next(error);
    }
  }
);
