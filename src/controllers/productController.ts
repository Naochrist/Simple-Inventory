import { Request, Response } from 'express';
import { ProductInstance } from '../models/productModel';

export default {
  async index(req: Request, res: Response) {
    const products = await ProductInstance.findAll();

    return res.json(products);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const product = await ProductInstance.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json(product);
  },

  async create(req: Request, res: Response) {
    const { stockId, productName, productPrice, productType, expiringDate, barcode } = req.body;
    const product = await ProductInstance.create({ id, stockId, productName, productPrice, productType, expiringDate, barcode });

    return res.json(product);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { productName, productPrice, productType, expiringDate, barcode } = req.body;
    const [updated] = await ProductInstance.update({ productName, productPrice, productType, expiringDate, barcode }, { where: { id } });

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = await ProductInstance.findByPk(id);

    return res.json(product);
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await ProductInstance.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(204).send();
  },
};

