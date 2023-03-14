import express, { NextFunction, Request, Response } from 'express';
import statusCodes from './statusCodes';
import 'express-async-errors';
import ProductRoutes from './routes/products.routes';
import UserRoutes from './routes/user.routes';
import OrderRoutes from './routes/order.routes';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(statusCodes.OK).send('Express + TypeScript');
});

app.use(ProductRoutes);
app.use(UserRoutes);
app.use(OrderRoutes);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  switch (name) {
    case 'BadRequestError':
      res.status(400).json({ message });
      break;
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    default:
      res.sendStatus(500);
  }
  next();
});
export default app;
