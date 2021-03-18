import BaseCollection from '../../../Entity/Collection/BaseCollection';
import CustomError from '../../../Entity/CustomError';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { user } = req;
    const { Collection = new CustomError('"collection:{Name:\'\'}" is required') } = req.body;
    const _collection = new BaseCollection({ ...Collection, UserId: user.id });
    const _data = await _collection.Get();
    res.json({
        success: true,
        message: 'Collection readed successfully',
        Collection: _data
    });
});
