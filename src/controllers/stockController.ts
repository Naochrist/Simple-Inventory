import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { StockInstance } from '../models/stockModel';
import { errorResponse, serverError, successResponse } from '../utils/helperMethods';


export const AddStock = async (req: Request, res: Response) => {
  try {
    const { productId, quantity, batchId } = req.body;
    const duplicate = await StockInstance.findOne({where: {batchId} })
    if (duplicate) {
      return errorResponse(res, 'BatchId already exists', httpStatus.CONFLICT)
    }

    const stock = await StockInstance.create({ productId, quantity, batchId });
    if (stock) {
      return successResponse(res, 'Stock added', httpStatus.CREATED, stock)
    } else {
      return errorResponse(res, 'Failed to add stock', httpStatus.BAD_GATEWAY)
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}

export const FetchStock = async (req: Request, res: Response) => {
  try {
    const stocks = await StockInstance.findAll();
    if (stocks.length) {
      return successResponse(res, 'Stocks found', httpStatus.OK, stocks)
    } else {
      return errorResponse(res, 'No stock found', httpStatus.NOT_FOUND)
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
} 

export const FetchStockById = async (req: Request, res: Response) => {
  try {
    const { batchId } = req.params;
    const stock = await StockInstance.findOne({ where: { batchId } });
    if (stock) {
      return successResponse(res, 'Stock found', httpStatus.OK, stock)
    } else {
      return errorResponse(res, 'No stock found', httpStatus.NOT_FOUND)
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}