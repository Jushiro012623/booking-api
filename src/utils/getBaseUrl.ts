import { Request } from "express";

const getBaseUrl = (req: Request): string => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;
};
export default getBaseUrl