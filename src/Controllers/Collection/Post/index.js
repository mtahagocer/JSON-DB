import BaseCollection from '../../../Entity/Collection/BaseCollection';
import CustomError from '../../../Entity/CustomError';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { User: { Id } } = req;
    const { CollectionName } = req.body;

    if (!CollectionName) throw new CustomError('Collection "Name" is required');
    const _collection = new BaseCollection({ Name: CollectionName, UserId: Id });
    await _collection.SaveCollection();
    
    res.json({
        Success: true,
        Message: `ÏCollection ${CollectionName} created Successfully`,
        Collection: _collection
    });
});
