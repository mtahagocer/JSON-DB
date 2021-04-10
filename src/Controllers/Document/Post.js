import BaseCollection from '../../Entity/Collection/BaseCollection';
import CustomError from '../../Entity/CustomError';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { User: { _Id } } = req;
    const { CollectionName, Document } = req.body;

    if (!Document) throw new CustomError('"Document" is required');

    const _collection = new BaseCollection({ UserId: _Id, Name: CollectionName });

    const _saved = await _collection.SaveDocument(Document);

    await _collection.Update(await _collection.Get().then((response) => {
        response.DocumentCount += 1;
        return response;
    }));


    res.json({
        Success: true,
        Message: 'Document saved Successfully',
        Document: _saved
    });
});
