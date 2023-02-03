import { Request, Response } from "express";
import { ProductInstance } from "../models/productModel";
import { v4 as uuidv4 } from 'uuid';
import { errorResponse, serverError, successResponse } from "../utils/helperMethods";
import httpStatus from "http-status";

export const AddProduct = async (req: Request, res: Response) => {
  try {
    const { productName, productPrice, productType } = req.body;
    const duplicate = await ProductInstance.findOne({where: {productName} })
    if (duplicate) {
      return errorResponse(res, 'Product already exists', httpStatus.CONFLICT)
    }

    const id = uuidv4();
    const product = await ProductInstance.create({ id, productName, productPrice, productType });
    if (product) {
      return successResponse(res, 'Product added', httpStatus.CREATED, product)
    } else {
      return errorResponse(res, 'Failed to add product', httpStatus.BAD_GATEWAY)
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}

export const FetchProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductInstance.findAll();
    if (products.length) {
      return successResponse(res, 'Products found', httpStatus.OK, products)
    } else {
      return errorResponse(res, 'No product found', httpStatus.NOT_FOUND)
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}

export const FetchProductById = async (req: Request, res: Response) => {
  try { 
    const { id } = req.params;
    const product = await ProductInstance.findByPk(id);
    if (product) {
      return successResponse(res, 'Product found', httpStatus.OK, product)
    } else {
      return errorResponse(res, 'No product found', httpStatus.NOT_FOUND)
    }
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}