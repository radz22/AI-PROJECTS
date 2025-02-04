import { Request, Response, NextFunction } from "express";
interface ErrorResponse {
  status: number;
  message: string;
}

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    status,
    message,
  });
};
