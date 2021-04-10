import asyncHandler from 'express-async-handler';
import DBUser from '../../Entity/User';

export default asyncHandler(async (req, res) => {
    const { UserName, Password } = req.body;

    const _user = await new DBUser().Save({ Password, UserName });

    res.status(200).json({
        Success: true,
        User: _user
    });
});
