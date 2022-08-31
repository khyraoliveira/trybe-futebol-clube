import { ErrorRequestHandler } from 'express';
import 'express-async-errors';

const errorMiddleware:ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      return res.status(400).json({ message });
      break;
    case 'Unauthorized':
      return res.status(401).json({ message });
      break;
    case 'NotFoundError':
      return res.status(404).json({ message });
      break;
    default:
      return res.sendStatus(500).json({ message });
  }
};
export default errorMiddleware;
