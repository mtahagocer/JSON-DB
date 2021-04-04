import asyncHandler from 'express-async-handler';
import BaseUser from '../../Entity/User';

export default asyncHandler(async (req, res) => {
    const { UserName, Password } = req.body;

    const _user = await new BaseUser().Save({ Password, UserName });

    res.status(200).json({
        Success: true,
        User: _user
    });
});
