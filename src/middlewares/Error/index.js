export default function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            Success: false,
            error: ['Invalid token']
        });
    }
    if (err) {
        const { status, message } = err;

        return res.status(status).json({
            Success: false,
            Status: status,
            Message: message,
        });
    }
    next();
}
