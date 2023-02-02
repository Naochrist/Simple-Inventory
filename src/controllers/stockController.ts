import { Router, Request, Response } from 'express';
import { StockInstance } from '../models/stockModel';

const router = Router();

router.get('/stocks', async (req: Request, res: Response) => {
  const stocks = await StockInstance.findAll();
  res.json(stocks);
});

router.post('/stocks', async (req: Request, res: Response) => {
  const { productName, quantity, batchId } = req.body;
  const stock = await StockInstance.create({ productName, quantity, batchId });
  res.json(stock);
});

router.put('/stocks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productName, quantity, batchId } = req.body;
  const stocks = await StockInstance.update({ productName, quantity, batchId }, { where: { id } });
  res.json(stocks);
});

router.delete('/stocks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await StockInstance.destroy({ where: { id } });
  res.json({ message: 'Stock deleted successfully' });
});

export { router as stockRouter };