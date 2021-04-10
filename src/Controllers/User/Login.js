import asyncHandler from 'express-async-handler';
import DBUser from '../../Entity/User';

export default asyncHandler(async (req, res) => {
    const { UserName, Password } = req.body;

    res.status(200).json({
        Success: true,
        Token: await new DBUser().Login({ Password, UserName })
    });
});
