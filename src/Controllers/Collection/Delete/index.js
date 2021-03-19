import BaseCollection from '../../../Entity/Collection/BaseCollection';
import CustomError from '../../../Entity/CustomError';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { user } = req;
    const { Name = new CustomError('Collection "Name" is required'), force = false } = req.body;
    const _collection = new BaseCollection({ Name, UserId: user.id });
    await _collection.Delete(force);
    res.json({
        success: true,
        message: `Collection ${Name} deleted successfully`
    });
});
