export default function (err, req, res) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            Success: false,
            error: ['Invalid token']
        });
    }

    const { status, message } = err;

    return res.status(status).json({
        Success: false,
        status,
        Message: message,
    });
}
