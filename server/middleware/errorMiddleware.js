/**
 * Middleware to handle 404 Not Found errors.
 * This will be called if no other route matches the request.
 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Global Error Handler Middleware.
 * This catches all errors passed to next() and sends a JSON response.
 */
const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);

    // Log to file for debugging
    import('fs').then(fs => {
        fs.appendFileSync('error.log', `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\nError: ${err.message}\nStack: ${err.stack}\n\n`);
    });
    // If the status code is 200, change it to 500 (Internal Server Error)
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Check for Mongoose bad ObjectId (CastError)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message,
        // Show stack trace only in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { notFound, errorHandler };
