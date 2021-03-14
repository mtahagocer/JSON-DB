export default function (err, req, res, next) {
    console.error({ err });
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            success: false,
            error: ['Invalid token']
        });
    }
    next();
}
