import BaseCollection from '../../../Entity/Collection/BaseCollection';
import CustomError from '../../../Entity/CustomError';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { user } = req;
    const { CollectionName } = req.body;
    if (!CollectionName) throw new CustomError('Collection "Name" is required');
    const _collection = new BaseCollection({ Name: CollectionName, UserId: user.id });
    const _data = await _collection.Get();
    res.json({
        success: true,
        message: `Collection ${CollectionName} readed successfully`,
        Collection: _data
    });
});
