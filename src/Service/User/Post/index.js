import BaseDocument from '../../../Entity/Document/BaseDocument';
import BaseCollection from '../../../Entity/Collection/BaseCollection';
import CustomError from '../../../Entity/CustomError';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, res) => {
    const { User: { Id } } = req;
    const { CollectionName, Document } = req.body;

    if (!Document) throw new CustomError('"Document" is required');

    const _document = new BaseDocument(CollectionName, Document);
    const _collection = new BaseCollection({ UserId: Id, Name: CollectionName });
    await _collection.Update(await _collection.Get().then((response) => {
        response.DocumentCount += 1;
        return response;
    }));

    const _data = await _document.SaveDocument(Id);

    res.json({
        success: true,
        message: 'Document saved successfully',
        Document: _data
    });
});
