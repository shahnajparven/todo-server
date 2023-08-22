import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import globalErrorHandler from './controllers/errorController.js';
import AppRoutes from './routes/index.js';
import AppError from './utils/appError.js';


const app = express();

const options = [
    cors({ origin: true, credentials: true }),
    express.json({ limit: '30mb' }),
    cookieParser(),
];

app.use("*",options);

// routes
app.get('/', (req, res) =>
    res.json({
        status: 'success',
        message: 'Server is running :)',
    })
);
app.use('/api/v1', AppRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;