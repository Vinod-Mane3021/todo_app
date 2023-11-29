import HttpStatusCode from "../constants/HttpStatusCodes"
import { Request, Response, NextFunction } from "express"
import ApiResponse from "./ApiResponse"

const asyncHandler = (fun: Function) => {
    // extract req, res and next from func (passed function)
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fun(req, res, next)
        } catch (error) {
            return new ApiResponse(error.code || HttpStatusCode.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", error.message).sendResponse(res)
        }
    }
} 

export default asyncHandler;