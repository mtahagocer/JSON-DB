import BaseCollection from '../../../Entity/Collection/BaseCollection';
import CustomError from '../../../Entity/CustomError';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { User: { Id } } = req;
    const { CollectionName, Params } = req.body;

    if (!Params) throw new CustomError('"Params" is required');

    const _collection = new BaseCollection({ UserId: Id, Name: CollectionName });

    const _saved = await _collection.SaveDocument(Params);

    await _collection.Update(await _collection.Get().then((response) => {
        response.DocumentCount += 1;
        return response;
    }));


    res.json({
        success: true,
        message: 'Document saved successfully',
        Document: _saved
    });
});
