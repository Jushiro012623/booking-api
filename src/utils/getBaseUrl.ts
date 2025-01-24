import { Request } from "express";

export default (req: Request): string => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;
};
