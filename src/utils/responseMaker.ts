import { Response } from "express";

interface Pagination {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

const createResponse = (
    res: Response,
    status: number,
    success: boolean,
    message: string,
    data: any = null,
    pagination: Pagination | null = null
) => {
    const response: any = {
        success,
        message,
        data,
    };

    if (pagination) {
        response.pagination = pagination;
    }

    res.status(status).json(response);
};

const ok = (res: Response,
    message: string,
    data: any = null,
    pagination: Pagination | null = null
) => {
    const response: any = {
        success : true,
        message,
        data,
    };

    if (pagination) {
        response.pagination = pagination;
    }

    res.status(200).json(response);
};

export default createResponse;