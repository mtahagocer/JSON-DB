class CustomError extends Error {
    status: number;
    constructor(message, status = 400,) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
export default CustomError;
