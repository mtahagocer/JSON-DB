import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { Password } = req.body;
    
    await req.User.Update(Password);

    res.status(200).json({
        Success: true,
        User: req.User
    });
});
