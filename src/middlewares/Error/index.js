export default function (err, req, res) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            success: false,
            error: ['Invalid token']
        });
    }

    const { status, message } = err;

    return res.status(status).json({
        success: false,
        status,
        message,
    });
}
